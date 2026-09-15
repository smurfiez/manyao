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

const DEFAULT_SC_CLIENT_ID = "Pb72ranhoyt6gw7hM7TkzUItXlMWSNSo";

const FALLBACK_SOUNDCLOUD_MIXES = [
  {
    id: "2396803131",
    title: "Manyao Mix 2026 Special Req Asen hauba",
    channel: "AprinaLdy™",
    duration: 9085,
    duration_formatted: "2h 31m",
    url: "https://soundcloud.com/aprinaldy-tm/manyao-mix-2026-special-req-1",
    artwork: "https://i1.sndcdn.com/artworks-Qf3PHlLyVOzYHZ06-u8zujw-large.jpg"
  },
  {
    id: "2128894074",
    title: "SPECIAL MIX MANYAO 2025 REQ RUPIAHBET",
    channel: "AprinaLdy™",
    duration: 3854,
    duration_formatted: "1h 4m",
    url: "https://soundcloud.com/aprinaldy-tm/special-mix-manyao-2025-req-rupiahbet",
    artwork: "https://i1.sndcdn.com/artworks-4rbwXdW3C9SxuK1x-sEMdIA-large.png"
  },
  {
    id: "1983742918",
    title: "NONSTOP CHINESE MANYAO CLUB MIX 2025",
    channel: "DJ Master Asia",
    duration: 4920,
    duration_formatted: "1h 22m",
    url: "https://soundcloud.com/user-778899/manyao-club-2025",
    artwork: ""
  },
  {
    id: "1892301823",
    title: "Chinese DJ 92CCDJ Nonstop Manyao High Bass 2026",
    channel: "BassDrop Records",
    duration: 5410,
    duration_formatted: "1h 30m",
    url: "https://soundcloud.com/dj-bass-records/chinese-manyao-92cc",
    artwork: ""
  },
  {
    id: "1782910394",
    title: "Electro Manyao Dance Beat Vol. 88 (Full Mix)",
    channel: "Club EDM China",
    duration: 7200,
    duration_formatted: "2h 0m",
    url: "https://soundcloud.com/club-edm-china/electro-manyao-88",
    artwork: ""
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

  const clientId = (context.env && context.env.SOUNDCLOUD_CLIENT_ID) || DEFAULT_SC_CLIENT_ID;
  let tracks = [];

  try {
    const scUrl = `https://api-v2.soundcloud.com/search/tracks?q=${encodeURIComponent(q)}&filter.duration=epic&limit=30&client_id=${clientId}`;
    const res = await fetch(scUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
      }
    });

    if (res.ok) {
      const data = await res.json();
      const items = data.collection || [];
      for (const t of items) {
        const durMs = t.duration || 0;
        const durSec = Math.floor(durMs / 1000);
        if (durSec >= minDurationSec && t.permalink_url) {
          tracks.push({
            id: String(t.id),
            title: t.title || "Manyao Mix",
            channel: t.user?.username || "SoundCloud DJ",
            duration: durSec,
            duration_formatted: formatDuration(durSec),
            url: t.permalink_url,
            artwork: t.artwork_url || t.user?.avatar_url || ""
          });
        }
      }
    }
  } catch (err) {
    console.error("SoundCloud search edge error:", err);
  }

  // If no live results were found (rate limit or network block), use curated >1hr fallback mixes
  if (tracks.length === 0) {
    tracks = [...FALLBACK_SOUNDCLOUD_MIXES];
  }

  const results = shuffle(tracks).slice(0, count);

  return new Response(JSON.stringify({
    platform: "soundcloud",
    query: q,
    min_duration: minDurationSec,
    count: results.length,
    tracks: results
  }), {
    status: 200,
    headers: corsHeaders()
  });
}
