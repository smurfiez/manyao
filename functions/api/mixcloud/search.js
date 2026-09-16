const MANYAO_MIX_QUERIES = [
  "manyao nonstop",
  "manyao remix",
  "92ccdj manyao",
  "chinese dj manyao nonstop",
  "manyao club mix",
  "electro manyao nonstop",
  "dj manyao full bass",
  "chinese dj remix nonstop"
];

const FALLBACK_MIXCLOUD_MIXES = [
  {
    id: "/jarty-ye/%E4%B8%8D%E6%83%B3v3%E6%B5%AA%E4%BA%BA%E7%90%B5%E7%90%B6%E6%84%9F%E8%AC%9D%E4%BD%A0%E6%9B%BE%E4%BE%86%E9%81%8Ermx-2k18-private-nonstop-manyao-just-for-ah-qun-by-dj-ye/",
    key: "/jarty-ye/%E4%B8%8D%E6%83%B3v3%E6%B5%AA%E4%BA%BA%E7%90%B5%E7%90%B6%E6%84%9F%E8%AC%9D%E4%BD%A0%E6%9B%BE%E4%BE%86%E9%81%8Ermx-2k18-private-nonstop-manyao-just-for-ah-qun-by-dj-ye/",
    title: "不想V3●浪人琵琶●感謝你曾來過RMX 2K18 PRIVATE NONSTOP MANYAO JUST FOR Ah Qun BY DJ Ye",
    channel: "DJ'YE",
    duration: 3843,
    duration_formatted: "1h 4m",
    url: "https://www.mixcloud.com/jarty-ye/%E4%B8%8D%E6%83%B3v3%E6%B5%AA%E4%BA%BA%E7%90%B5%E7%90%B6%E6%84%9F%E8%AC%9D%E4%BD%A0%E6%9B%BE%E4%BE%86%E9%81%8Ermx-2k18-private-nonstop-manyao-just-for-ah-qun-by-dj-ye/",
    artwork: "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/f/a/0/b/e928-f6f2-4941-b12a-87420837c3db"
  },
  {
    id: "/junyan-lo/%E6%B2%99%E6%BC%A0%E9%AA%86%E9%A9%BC%E6%8B%A5%E6%8A%B1%E4%BD%A0%E7%A6%BB%E5%8E%BB%E7%AD%94%E6%A1%88-manyao-remix-2k18-by-dj-y/",
    key: "/junyan-lo/%E6%B2%99%E6%BC%A0%E9%AA%86%E9%A9%BC%E6%8B%A5%E6%8A%B1%E4%BD%A0%E7%A6%BB%E5%8E%BB%E7%AD%94%E6%A1%88-manyao-remix-2k18-by-dj-y/",
    title: "沙漠骆驼$拥抱你离去$答案 MANYAO REMIX 2K18 BY DJ Y",
    channel: "DJ Y神 (Y'P'DJs)",
    duration: 3804,
    duration_formatted: "1h 3m",
    url: "https://www.mixcloud.com/junyan-lo/%E6%B2%99%E6%BC%A0%E9%AA%86%E9%A9%BC%E6%8B%A5%E6%8A%B1%E4%BD%A0%E7%A6%BB%E5%8E%BB%E7%AD%94%E6%A1%88-manyao-remix-2k18-by-dj-y/",
    artwork: "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/e/9/7/2/d345-8a1d-4078-b22b-627ec773f8cf"
  },
  {
    id: "/ng-kianchee/%E9%94%99%E5%AD%A3%E6%B2%89%E9%86%89%E7%9A%84%E9%9D%92%E4%B8%9D%E5%96%84%E5%8F%98%E5%A4%9C%E6%9B%B2%E5%88%BB%E5%9C%A8%E6%88%91%E5%BF%83%E5%BA%95%E7%9A%84%E5%90%8D%E5%AD%97nonstop-manyao-mix-2k20-by-djkc/",
    key: "/ng-kianchee/%E9%94%99%E5%AD%A3%E6%B2%89%E9%86%89%E7%9A%84%E9%9D%92%E4%B8%9D%E5%96%84%E5%8F%98%E5%A4%9C%E6%9B%B2%E5%88%BB%E5%9C%A8%E6%88%91%E5%BF%83%E5%BA%95%E7%9A%84%E5%90%8D%E5%AD%97nonstop-manyao-mix-2k20-by-djkc/",
    title: "错季●沉醉的青丝●善变●夜曲●刻在我心底的名字●NONSTOP MANYAO MIX 2K20 BY DJKC",
    channel: "DJ KC | UNiTED V.i.P'G DJs",
    duration: 3628,
    duration_formatted: "1h 0m",
    url: "https://www.mixcloud.com/ng-kianchee/%E9%94%99%E5%AD%A3%E6%B2%89%E9%86%89%E7%9A%84%E9%9D%92%E4%B8%9D%E5%96%84%E5%8F%98%E5%A4%9C%E6%9B%B2%E5%88%BB%E5%9C%A8%E6%88%91%E5%BF%83%E5%BA%95%E7%9A%84%E5%90%8D%E5%AD%97nonstop-manyao-mix-2k20-by-djkc/",
    artwork: "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/d/c/9/b/ead8-ad8a-44e4-9e12-5c68f1a08afa"
  },
  {
    id: "/jarty-ye/%E7%BD%97%E6%9B%BC%E8%92%82%E5%85%8B%E7%9A%84%E7%88%B1%E6%83%85%E9%AB%94%E9%9D%A2%E7%97%85%E8%AE%8Armx-2k18-private-nonstop-manyao-just-for-bb-by-dj-ye/",
    key: "/jarty-ye/%E7%BD%97%E6%9B%BC%E8%92%82%E5%85%8B%E7%9A%84%E7%88%B1%E6%83%85%E9%AB%94%E9%9D%A2%E7%97%85%E8%AE%8Armx-2k18-private-nonstop-manyao-just-for-bb-by-dj-ye/",
    title: "罗曼蒂克的爱情✘體面✘病變RMX 2K18 PRIVATE NONSTOP MANYAO JUST FOR BB BY DJ Ye",
    channel: "DJ'YE",
    duration: 4638,
    duration_formatted: "1h 17m",
    url: "https://www.mixcloud.com/jarty-ye/%E7%BD%97%E6%9B%BC%E8%92%82%E5%85%8B%E7%9A%84%E7%88%B1%E6%83%85%E9%AB%94%E9%9D%A2%E7%97%85%E8%AE%8Armx-2k18-private-nonstop-manyao-just-for-bb-by-dj-ye/",
    artwork: "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/c/b/3/c/8a52-8ef6-4f62-bf86-03e6fd092e03"
  },
  {
    id: "/ng-kianchee/djkc-%E4%B9%9D%E4%B8%87%E5%AD%97%E8%B7%B3%E6%A5%BC%E6%9C%BA%E5%BA%A7%E4%BD%8D%E7%97%B4%E6%83%85%E7%9A%84%E7%94%B7%E5%AD%90%E6%B1%89%E5%BF%99%E7%BA%BF%E5%B0%8F%E5%AD%A9%E9%9B%A8%E5%A4%A9%E9%9B%AA%E8%97%8Fmanyao-mix-2k25/",
    key: "/ng-kianchee/djkc-%E4%B9%9D%E4%B8%87%E5%AD%97%E8%B7%B3%E6%A5%BC%E6%9C%BA%E5%BA%A7%E4%BD%8D%E7%97%B4%E6%83%85%E7%9A%84%E7%94%B7%E5%AD%90%E6%B1%89%E5%BF%99%E7%BA%BF%E5%B0%8F%E5%AD%A9%E9%9B%A8%E5%A4%A9%E9%9B%AA%E8%97%8Fmanyao-mix-2k25/",
    title: "DJ‘KC｛九万字●跳楼机●座位●痴情的男子汉●忙线●小孩●雨天●雪藏●MANYAO MIX 2K25｝",
    channel: "DJ KC | UNiTED V.i.P'G DJs",
    duration: 6830,
    duration_formatted: "1h 53m",
    url: "https://www.mixcloud.com/ng-kianchee/djkc-%E4%B9%9D%E4%B8%87%E5%AD%97%E8%B7%B3%E6%A5%BC%E6%9C%BA%E5%BA%A7%E4%BD%8D%E7%97%B4%E6%83%85%E7%9A%84%E7%94%B7%E5%AD%90%E6%B1%89%E5%BF%99%E7%BA%BF%E5%B0%8F%E5%AD%A9%E9%9B%A8%E5%A4%A9%E9%9B%AA%E8%97%8Fmanyao-mix-2k25/",
    artwork: "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/b/0/d/0/9b21-1d33-4f7a-9a12-32a3916b7925"
  },
  {
    id: "/jarty-ye/momo%E5%B0%88%E5%B1%AC%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%9C%E0%B8%B2%E0%B8%99-pure-x-%E6%B3%B0%E5%9C%8B%E6%AD%8C-wip-wup-x-dior%E5%A4%A7%E7%A9%8E_-_%E6%84%9B%E8%87%AA%E5%B7%B1%E6%9B%B4%E6%B7%B1rmx-2o2o-private-manyao-nonstop-by-djye/",
    key: "/jarty-ye/momo%E5%B0%88%E5%B1%AC%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%9C%E0%B8%B2%E0%B8%99-pure-x-%E6%B3%B0%E5%9C%8B%E6%AD%8C-wip-wup-x-dior%E5%A4%A7%E7%A9%8E_-_%E6%84%9B%E8%87%AA%E5%B7%B1%E6%9B%B4%E6%B7%B1rmx-2o2o-private-manyao-nonstop-by-djye/",
    title: "『MoMo^專屬』【ทางผาน - Pure X 泰國歌 - Wip Wup X Dior大穎_-_愛自己更深】Rmx 2o2o Private ManYao NonStop By Dj'Ye",
    channel: "DJ'YE",
    duration: 4757,
    duration_formatted: "1h 19m",
    url: "https://www.mixcloud.com/jarty-ye/momo%E5%B0%88%E5%B1%AC%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%9C%E0%B8%B2%E0%B8%99-pure-x-%E6%B3%B0%E5%9C%8B%E6%AD%8C-wip-wup-x-dior%E5%A4%A7%E7%A9%8E_-_%E6%84%9B%E8%87%AA%E5%B7%B1%E6%9B%B4%E6%B7%B1rmx-2o2o-private-manyao-nonstop-by-djye/",
    artwork: "https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/9/c/5/3/2f28-d41a-49b5-be75-a275520fc13b"
  }
];

function corsHeaders() {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "*"
  };
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
    q = MANYAO_MIX_QUERIES[Math.floor(Math.random() * MANYAO_MIX_QUERIES.length)];
  }

  let tracks = [];

  try {
    const mcUrl = `https://api.mixcloud.com/search/?q=${encodeURIComponent(q)}&type=cloudcast`;
    const res = await fetch(mcUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
      }
    });

    if (res.ok) {
      const data = await res.json();
      const items = data.data || [];
      for (const item of items) {
        const durSec = item.audio_length || 0;
        if (durSec >= minDurationSec && item.key) {
          const pictures = item.pictures || {};
          const artwork = pictures.large || pictures.medium || "";
          tracks.push({
            id: item.key,
            key: item.key,
            title: item.name || "Manyao Cloudcast",
            channel: item.user?.name || "Mixcloud DJ",
            duration: durSec,
            duration_formatted: formatDuration(durSec),
            url: item.url || `https://www.mixcloud.com${item.key}`,
            artwork: artwork
          });
        }
      }
    }
  } catch (err) {
    console.error("Mixcloud search edge error:", err);
  }

  // If no live results found, use curated >1hr fallback mixes
  if (tracks.length === 0) {
    tracks = [...FALLBACK_MIXCLOUD_MIXES];
  }

  const results = shuffle(tracks).slice(0, count);

  return new Response(JSON.stringify({
    platform: "mixcloud",
    query: q,
    min_duration: minDurationSec,
    count: results.length,
    tracks: results
  }), {
    status: 200,
    headers: corsHeaders()
  });
}
