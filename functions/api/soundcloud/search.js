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
    id: "2331874988",
    title: "SUPER EXCLUSIVE MANYAO REMIX 2026 REQ ALEXEIFINLEY",
    channel: "HeNz CheN",
    duration: 5523,
    duration_formatted: "1h 32m",
    url: "https://soundcloud.com/henz_chen/super-exclusive-manyao-remix",
    artwork: "https://i1.sndcdn.com/artworks-2FlOyVz9grmOLspo-m2JoEw-large.jpg"
  },
  {
    id: "2168640663",
    title: "𝐁𝐄𝐑𝐋𝐈𝐍𝐓𝐎𝐓𝐎 MANYAO MANDARIN REMIX TERBARU 2025",
    channel: "AprinaLdy™",
    duration: 8005,
    duration_formatted: "2h 13m",
    url: "https://soundcloud.com/aprinaldy-tm/manyao-mandarin-remix-terbaru-2025",
    artwork: "https://i1.sndcdn.com/artworks-nZ7JFPFqibv8lyRF-uO71Rw-large.png"
  },
  {
    id: "2372195411",
    title: "DJ Draken Manyao Melbourne Remix 2026 Full Bass",
    channel: "DJ DRAKEN",
    duration: 4664,
    duration_formatted: "1h 17m",
    url: "https://soundcloud.com/djken1688/dj-draken-manyao-melbourne",
    artwork: "https://i1.sndcdn.com/artworks-CoBtMnTEBB1qGajT-R6kppA-large.jpg"
  },
  {
    id: "2343885377",
    title: "MANYAO INDO 404 REMIX 2026",
    channel: "AprinaLdy™",
    duration: 3871,
    duration_formatted: "1h 4m",
    url: "https://soundcloud.com/aprinaldy-tm/manyao-indo-404-remix-2026",
    artwork: "https://i1.sndcdn.com/artworks-5QpERKiDj6NcCdvQ-ST64EA-large.png"
  },
  {
    id: "2399645982",
    title: "EXCLUSIVE MANYAO CHINESE REMIX 2026 HOT PLAYLIST",
    channel: "MOMOPLAY",
    duration: 4294,
    duration_formatted: "1h 11m",
    url: "https://soundcloud.com/momoplay-oficial/exclusive-manyao-chinese-remix",
    artwork: "https://i1.sndcdn.com/artworks-RFJ2JqyPod18Mt8z-hi3Pnw-large.jpg"
  },
  {
    id: "2399142171",
    title: "Hai Yu Ni メ Tiao Lou Ji メ Wu Ren Zhi Dao メ MANYAO VINA ELECTRO BOUNCE REMIX 2026 By RAJAKING",
    channel: "RAJAGROUP",
    duration: 6342,
    duration_formatted: "1h 45m",
    url: "https://soundcloud.com/rajagroup/hai-yu-ni-tiao-lou-ji-wu-ren",
    artwork: "https://i1.sndcdn.com/artworks-bK7qqvanlMISvEGH-VvvynQ-large.jpg"
  },
  {
    id: "2169354729",
    title: "MANYAO TERBARU REMIX 2025 SPECIAL REQ KIMMY",
    channel: "Ervito Liu",
    duration: 3750,
    duration_formatted: "1h 2m",
    url: "https://soundcloud.com/ervito-liu/manyao-nonstop-remix-2025",
    artwork: "https://i1.sndcdn.com/artworks-LDOHTL5xK30Md2tV-uJ1gZg-large.jpg"
  },
  {
    id: "2382540123",
    title: "CHOU LI X HAI YU NI MANYAO ELECTRO REMIX 2026",
    channel: "MOMOPLAY",
    duration: 4030,
    duration_formatted: "1h 7m",
    url: "https://soundcloud.com/momoplay-oficial/chou-li-x-hai-yu-ni-manyao",
    artwork: "https://i1.sndcdn.com/artworks-JpN20vmZGeYJOeRY-8i1uPA-large.jpg"
  },
  {
    id: "2088329367",
    title: "FULL JJ LIN & JAY CHOU ♪ DJ MANYAO REMIX FAVORIT SONG 2025 By Mr. Hau",
    channel: "WnDy",
    duration: 4979,
    duration_formatted: "1h 22m",
    url: "https://soundcloud.com/wandywi/full-jj-lin-jay-chou-dj-manyao-remix-favorit-song-2025-by-mr-hau",
    artwork: "https://i1.sndcdn.com/artworks-N8dPBK3zwphQZeRo-abxiIg-large.png"
  },
  {
    id: "2276572058",
    title: "MANYAO REMIX MANDARIN BARAT 2026 #JFZMIXTAPE",
    channel: "JASON FLAMEBEATZ",
    duration: 4480,
    duration_formatted: "1h 14m",
    url: "https://soundcloud.com/jason-flamebeatzz/manyao-remix-mandarin-barat",
    artwork: "https://i1.sndcdn.com/artworks-gdH0xjCBvsdAHmyW-TI9P2w-large.png"
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
