const MANYAO_QUERIES = [
  "manyao mix 1 hour",
  "92ccdj 慢摇 1小时",
  "chinese dj nonstop 1 hour",
  "全中文慢摇 连续大碟 2026",
  "manyao nonstop dj 2026",
  "全中文慢摇 劲爆夜店重低音 1小时",
  "慢摇 串烧 1小时以上",
  "electro manyao continuous mix 1 hour",
  "慢摇 重低音 舞曲 1小时",
  "chinese manyao edm nonstop 1 hour"
];

const FALLBACK_TRACKS = [
  { id: "eG0PXloNT1s", title: "NONSTOP MANYAO MANDARIN HIGH REMIX 2025 SPECIAL REQ BY StevArsJayden1899", channel: "StevArsJayden", duration: 11642, duration_formatted: "3h 14m" },
  { id: "zRdUAPPPdP8", title: "DeeJay AK《2小时最新快摇串烧》超劲爆节奏 强劲来袭 | 92CCDJ Release", channel: "92CCDJ", duration: 7433, duration_formatted: "2h 3m" },
  { id: "n65BaTbQIpY", title: "#92CCDJ - 預謀 x 愛妳 x 走心 x 愛河 x 煙幕 ╳ 全新中文慢摇连续大碟", channel: "92CCDJ", duration: 3665, duration_formatted: "1h 1m" },
  { id: "2xJcOnaF7Ck", title: "㊣92CCDJ - 2025慢搖《超好聽》天真的橡皮 x 我曾經發了瘋的想 x 車載音樂串燒", channel: "92CCDJ", duration: 4055, duration_formatted: "1h 7m" },
  { id: "CgI0mvecgA8", title: "DJ-MJ Nonstop V64 2025【偏向 X 跳楼机 X 执子之手 X 谦让 X 青花 X 满天星辰不及你】", channel: "DJ-MJ Official", duration: 4025, duration_formatted: "1h 7m" },
  { id: "98zOmuP-YXA", title: "DJKY 全中文DJ舞曲🔥大头针翻唱｜泪海 ✘ 水手 ✘ 记事本 ✘ 出卖 Electro ReMix 2025", channel: "Ky Music", duration: 3644, duration_formatted: "1h 0m" },
  { id: "g3OpaY2BBJw", title: "全中文慢摇 最好聽的慢搖舞曲 DJ FC FONG REMIX | 92CCDJ Release", channel: "92CCDJ", duration: 5477, duration_formatted: "1h 31m" },
  { id: "r2Fqh_-fDw0", title: "MANYAO NONSTOP - 再给我一分钟时间 - ELECTRO MANYAO REMIX 2026", channel: "Minsex Manyao", duration: 4533, duration_formatted: "1h 15m" },
  { id: "7de1SE79vyQ", title: "MANYAO NONSTOP - 再给我一分钟时间 - VINABOUNCE REMIX 2026", channel: "Minsex Manyao", duration: 4586, duration_formatted: "1h 16m" },
  { id: "mopbmaijjWY", title: "2026 DJ'YE NONSTOP MANYAO SONG OINSO MUSIC", channel: "Oinso Music", duration: 3811, duration_formatted: "1h 3m" }
];

function corsHeaders() {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "*"
  };
}

function parseDurationText(text) {
  if (!text) return 0;
  const parts = text.trim().split(":").map(p => parseInt(p, 10));
  if (parts.some(isNaN)) return 0;
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 4) {
    return parts[0] * 86400 + parts[1] * 3600 + parts[2] * 60 + parts[3];
  }
  return 0;
}

function parseIsoDuration(durationStr) {
  if (!durationStr) return 0;
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

function formatDuration(seconds) {
  if (!seconds) return "1h+";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) {
    return m > 0 ? `${h}h ${m}m` : `${h} hrs`;
  }
  return `${m}m`;
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
  const minDurationSec = parseInt(url.searchParams.get("min_duration") || "3600", 10);
  let q = url.searchParams.get("q");

  if (!q) {
    q = MANYAO_QUERIES[Math.floor(Math.random() * MANYAO_QUERIES.length)];
  }

  // Check if YOUTUBE_API_KEY is available in Cloudflare environment variables
  const apiKey = context.env && context.env.YOUTUBE_API_KEY;
  let tracks = [];

  if (apiKey) {
    try {
      const ytApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=video&videoDuration=long&maxResults=${Math.max(count * 2, 25)}&key=${apiKey}`;
      const res = await fetch(ytApiUrl);
      if (res.ok) {
        const data = await res.json();
        const items = (data.items || []).filter(item => item.id && item.id.videoId);
        const videoIds = items.map(item => item.id.videoId);

        if (videoIds.length > 0) {
          // Fetch duration details via videos endpoint
          const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds.join(",")}&key=${apiKey}`;
          const detailsRes = await fetch(detailsUrl);
          if (detailsRes.ok) {
            const detailsData = await detailsRes.json();
            for (const v of (detailsData.items || [])) {
              const durSec = parseIsoDuration(v.contentDetails?.duration);
              if (durSec >= minDurationSec) {
                tracks.push({
                  id: v.id,
                  title: v.snippet?.title || "Manyao Mix",
                  channel: v.snippet?.channelTitle || "Manyao DJ",
                  duration: durSec,
                  duration_formatted: formatDuration(durSec)
                });
              }
            }
          }
        }
      }
    } catch (e) {
      console.error("YouTube API Key error:", e);
    }
  }

  // If no API key or API key call failed, scrape YouTube search page with duration filter
  if (tracks.length === 0) {
    try {
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}&sp=EgIYAw%3D%3D`;
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
                const lengthText = vr.lengthText?.simpleText || "";
                const durSec = parseDurationText(lengthText);

                // Strictly filter for >= minDurationSec (default 1 hour = 3600 seconds)
                if (vid.length === 11 && !vr.badges && durSec >= minDurationSec) {
                  tracks.push({
                    id: vid,
                    title,
                    channel,
                    duration: durSec,
                    duration_formatted: formatDuration(durSec)
                  });
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

  // If still empty, use curated >1hr fallback tracks
  if (tracks.length === 0) {
    tracks = [...FALLBACK_TRACKS];
  }

  const results = shuffle(tracks).slice(0, count);

  return new Response(JSON.stringify({
    platform: "youtube",
    query: q,
    min_duration: minDurationSec,
    count: results.length,
    tracks: results
  }), {
    status: 200,
    headers: corsHeaders()
  });
}
