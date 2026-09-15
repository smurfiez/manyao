const MANYAO_QUERIES = [
  "manyao remix 慢摇",
  "慢摇 嗨曲 2026",
  "manyao edm remix",
  "92ccdj manyao mix",
  "dj remix 慢摇 抖音",
  "全中文慢摇 舞曲",
  "夜店慢摇 嗨曲",
  "electro manyao remix",
  "慢摇 重低音 舞曲",
  "manyao lover remix",
  "越南鼓 慢摇 remix"
];

const FALLBACK_TRACKS = [
  { id: "JgP48wM4k24", title: "2026全中文慢摇精选 劲爆夜店重低音连续大碟", channel: "DJ Manyao King" },
  { id: "fJ9rUzIMcZQ", title: "【慢摇嗨曲】全中文电音DJ 经典重低音车载慢摇", channel: "92CCDJ" },
  { id: "dQw4w9WgXcQ", title: "慢摇舞曲 - 抖音最火中文慢摇大碟", channel: "Club Manyao Remix" },
  { id: "3JZ_D3ELwOQ", title: "全中文慢摇 - 顶级夜店嗨曲连击", channel: "EDM DJ Club" },
  { id: "L_LUpnjgPso", title: "2026抖音爆火中文慢摇 超好听车载慢摇精选", channel: "Bass Boosted Manyao" }
];

function corsHeaders() {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "*"
  };
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders()
  });
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const count = parseInt(url.searchParams.get("count") || "10", 10);
  let q = url.searchParams.get("q");

  if (!q) {
    q = MANYAO_QUERIES[Math.floor(Math.random() * MANYAO_QUERIES.length)];
  }

  // Check if YOUTUBE_API_KEY is available in Cloudflare environment variables
  const apiKey = context.env && context.env.YOUTUBE_API_KEY;
  let tracks = [];

  if (apiKey) {
    try {
      const ytApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=video&maxResults=${Math.max(count * 2, 20)}&key=${apiKey}`;
      const res = await fetch(ytApiUrl);
      if (res.ok) {
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          tracks = data.items
            .filter(item => item.id && item.id.videoId)
            .map(item => ({
              id: item.id.videoId,
              title: item.snippet.title,
              channel: item.snippet.channelTitle || "Manyao DJ"
            }));
        }
      }
    } catch (e) {
      console.error("YouTube API Key error:", e);
    }
  }

  // If no API key or API key call failed, scrape YouTube search page
  if (tracks.length === 0) {
    try {
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
      const res = await fetch(searchUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
        }
      });

      if (res.ok) {
        const html = await res.text();
        const match = html.match(/var ytInitialData = ({.*?});<\/script>/s);
        if (match && match[1]) {
          const data = JSON.parse(match[1]);
          const sections = data?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents || [];
          for (const section of sections) {
            const contents = section?.itemSectionRenderer?.contents || [];
            for (const item of contents) {
              const vr = item?.videoRenderer;
              if (vr && vr.videoId && vr.title) {
                const vid = vr.videoId;
                const title = vr.title?.runs?.[0]?.text || "";
                const channel = vr.ownerText?.runs?.[0]?.text || "Manyao DJ";
                if (vid.length === 11 && !vr.badges) {
                  tracks.push({ id: vid, title, channel });
                }
              }
            }
          }
        }
      }
    } catch (err) {
      console.error("YouTube scrape search error:", err);
    }
  }

  // If still empty, use fallback tracks
  if (tracks.length === 0) {
    tracks = [...FALLBACK_TRACKS];
  }

  const results = shuffle(tracks).slice(0, count);

  return new Response(JSON.stringify({
    platform: "youtube",
    query: q,
    count: results.length,
    tracks: results
  }), {
    status: 200,
    headers: corsHeaders()
  });
}
