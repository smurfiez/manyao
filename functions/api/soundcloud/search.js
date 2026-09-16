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
    "id": "1193073424",
    "title": "NONSTOP MANYAO REMIX 2022",
    "channel": "Sean Lu",
    "duration": 6764,
    "duration_formatted": "1h 52m",
    "url": "https://soundcloud.com/seanjaya-ludy/manyao-2022",
    "artwork": "https://i1.sndcdn.com/artworks-2L8NvaNLofCUroYS-rEggug-large.jpg"
  },
  {
    "id": "1783730157",
    "title": "MANYAO REMIX TERBARU",
    "channel": "manyao edm",
    "duration": 7137,
    "duration_formatted": "1h 58m",
    "url": "https://soundcloud.com/manyao-edm/manyao-remix-terbaru",
    "artwork": "https://i1.sndcdn.com/artworks-5Zc6F9NxfBLockpS-JZdP3g-large.jpg"
  },
  {
    "id": "2343885377",
    "title": "MANYAO INDO 404 REMIX 2026",
    "channel": "AprinaLdy™",
    "duration": 3871,
    "duration_formatted": "1h 4m",
    "url": "https://soundcloud.com/aprinaldy-tm/manyao-indo-404-remix-2026",
    "artwork": "https://i1.sndcdn.com/artworks-5QpERKiDj6NcCdvQ-ST64EA-large.png"
  },
  {
    "id": "2097088377",
    "title": "《 Manyao Remix 2025 》跳楼机 ✘ 侧脸 ✘ 感谢你曾来过 ✘ 爱自己更深 ✘ Bowkylion",
    "channel": "Ly Saa",
    "duration": 4887,
    "duration_formatted": "1h 21m",
    "url": "https://soundcloud.com/melisa-landhy-714228889/manyao-remix-2025-by-henz-chen",
    "artwork": "https://i1.sndcdn.com/artworks-1yQsklvAMwrlmmgd-RSEltA-large.jpg"
  },
  {
    "id": "2339868731",
    "title": "SPECIAL MANYAO REMIX ANTI DROP 2026",
    "channel": "BANGHO",
    "duration": 9648,
    "duration_formatted": "2h 40m",
    "url": "https://soundcloud.com/bangho/special-manyao-remix-anti-drop",
    "artwork": "https://i1.sndcdn.com/artworks-odGVkXnd67dXOZHc-TYrMHw-large.png"
  },
  {
    "id": "2399645982",
    "title": "EXCLUSIVE MANYAO CHINESE REMIX 2026 HOT PLAYLIST",
    "channel": "MOMOPLAY",
    "duration": 4294,
    "duration_formatted": "1h 11m",
    "url": "https://soundcloud.com/momoplay-oficial/exclusive-manyao-chinese-remix",
    "artwork": "https://i1.sndcdn.com/artworks-RFJ2JqyPod18Mt8z-hi3Pnw-large.jpg"
  },
  {
    "id": "2301688244",
    "title": "《 Manyao Remix 2026 》Pentagramma ✘ 跳楼机 ✘ 忘了 ✘ 偏向 ✘ Bowkylion 【 BY RINDUTOGEL】",
    "channel": "JS GROUP",
    "duration": 4959,
    "duration_formatted": "1h 22m",
    "url": "https://soundcloud.com/jsgroup/manyao-remix-2026-pentagramma",
    "artwork": "https://i1.sndcdn.com/artworks-PX5kZOnY4pM1Fc3N-HRiEZQ-large.jpg"
  },
  {
    "id": "2169354729",
    "title": "MANYAO TERBARU REMIX 2025 SPECIAL REQ KIMMY (Ervito Liu)",
    "channel": "Ervito Liu",
    "duration": 3750,
    "duration_formatted": "1h 2m",
    "url": "https://soundcloud.com/ervito-liu/manyao-nonstop-remix-2025",
    "artwork": "https://i1.sndcdn.com/artworks-LDOHTL5xK30Md2tV-uJ1gZg-large.jpg"
  },
  {
    "id": "2369368496",
    "title": "FAVORITE MANYAO REMIX COLLECTION | FULL MANDARIN SPECIAL REQ | MR. PAW",
    "channel": "AprinaLdy™",
    "duration": 3690,
    "duration_formatted": "1h 1m",
    "url": "https://soundcloud.com/aprinaldy-tm/favorite-manyao-remix",
    "artwork": "https://i1.sndcdn.com/artworks-fJiBdGdlLUv88MBW-AxERzw-large.jpg"
  },
  {
    "id": "2092311390",
    "title": "NONSTOP MANYAO REMIX INDOBAR 2025 REQ KIOS77",
    "channel": "AprinaLdy™",
    "duration": 4884,
    "duration_formatted": "1h 21m",
    "url": "https://soundcloud.com/aprinaldy-tm/nonstop-manyao-remix-indobar-2025-req-kios77",
    "artwork": "https://i1.sndcdn.com/artworks-ptYcrXmeH0Bs3yo5-ykldsQ-large.png"
  },
  {
    "id": "2314201793",
    "title": "MANYAO REMIX 2026 SPECIAL REQ MR LD BY MALUKUTOTO",
    "channel": "RAJAGROUP",
    "duration": 7308,
    "duration_formatted": "2h 1m",
    "url": "https://soundcloud.com/rajagroup/manyao-remix-2026-special-req",
    "artwork": "https://i1.sndcdn.com/artworks-BvAUrrx7dAhfohXx-arUXSg-large.jpg"
  },
  {
    "id": "2168640663",
    "title": "𝐁𝐄𝐑𝐋𝐈𝐍𝐓𝐎𝐓𝐎 MANYAO MANDARIN REMIX TERBARU 2025",
    "channel": "AprinaLdy™",
    "duration": 8005,
    "duration_formatted": "2h 13m",
    "url": "https://soundcloud.com/aprinaldy-tm/manyao-mandarin-remix-terbaru-2025",
    "artwork": "https://i1.sndcdn.com/artworks-nZ7JFPFqibv8lyRF-uO71Rw-large.png"
  },
  {
    "id": "1143033766",
    "title": "Min Sen'z - MANYAO X BREAKBEAT - NEW REMIX 2020",
    "channel": "Poker757",
    "duration": 12598,
    "duration_formatted": "3h 29m",
    "url": "https://soundcloud.com/kasur-goyang/min-senz-manyao-x-breakbeat-new-remix-2020",
    "artwork": "https://i1.sndcdn.com/artworks-jJwANtcMBIpJLHjF-5lZuWQ-large.jpg"
  },
  {
    "id": "2382540123",
    "title": "CHOU LI X HAI YU NI MANYAO ELECTRO REMIX 2026",
    "channel": "MOMOPLAY",
    "duration": 4030,
    "duration_formatted": "1h 7m",
    "url": "https://soundcloud.com/momoplay-oficial/chou-li-x-hai-yu-ni-manyao",
    "artwork": "https://i1.sndcdn.com/artworks-JpN20vmZGeYJOeRY-8i1uPA-large.jpg"
  },
  {
    "id": "2374113890",
    "title": "BEST CHINESE MANYAO REMIX COLLECTION 2026 REQ CHIEN X CENCEN",
    "channel": "HeNz CheN",
    "duration": 3773,
    "duration_formatted": "1h 2m",
    "url": "https://soundcloud.com/henz_chen/best-chinese-manyao-remix",
    "artwork": "https://i1.sndcdn.com/artworks-IHVkBIUozBVjySVa-9TyDsw-large.jpg"
  },
  {
    "id": "1783084035",
    "title": "MANYAO REMIX INDOBAR 2024",
    "channel": "manyao edm",
    "duration": 4127,
    "duration_formatted": "1h 8m",
    "url": "https://soundcloud.com/manyao-edm/manyao-remix-indobar-2024",
    "artwork": "https://i1.sndcdn.com/artworks-zFnFPiAlAFuNVuaO-hZTMxQ-large.jpg"
  },
  {
    "id": "1865213304",
    "title": "Dj Chinese 郭火 ✘ 港号鱼箭你 Manyao Remix 2024 #160BPM #DJJ #RECORD",
    "channel": "RAJAGROUP",
    "duration": 4294,
    "duration_formatted": "1h 11m",
    "url": "https://soundcloud.com/rajagroup/dj-chinese-manyao-remix-2024-by-nonis77",
    "artwork": "https://i1.sndcdn.com/artworks-EdTeqU9jAnd3G8Q3-99tzMA-large.jpg"
  },
  {
    "id": "2351027435",
    "title": "MANYAO SUPER HIGH REMIX  2026 BY RAJAKING",
    "channel": "RAJAGROUP",
    "duration": 10857,
    "duration_formatted": "3h 0m",
    "url": "https://soundcloud.com/rajagroup/manyao-super-high-remix-2026",
    "artwork": "https://i1.sndcdn.com/artworks-yeF18kEC03ICHRii-UZRqGQ-large.png"
  },
  {
    "id": "2399142171",
    "title": "Hai Yu Ni メ Tiao Lou Ji メ Wu Ren Zhi Dao メ MANYAO VINA ELECTRO BOUNCE REMIX 2026 By RAJAKING",
    "channel": "RAJAGROUP",
    "duration": 6342,
    "duration_formatted": "1h 45m",
    "url": "https://soundcloud.com/rajagroup/hai-yu-ni-tiao-lou-ji-wu-ren",
    "artwork": "https://i1.sndcdn.com/artworks-bK7qqvanlMISvEGH-VvvynQ-large.jpg"
  },
  {
    "id": "2352913049",
    "title": "MANYAO CHINESE SUPER REMIX 2026 BY MALUKUTOTO",
    "channel": "RAJAGROUP",
    "duration": 10987,
    "duration_formatted": "3h 3m",
    "url": "https://soundcloud.com/rajagroup/manyao-chinese-super-remix",
    "artwork": "https://i1.sndcdn.com/artworks-zRvcdCj6mP1hg30x-jp71Wg-large.png"
  },
  {
    "id": "2343045689",
    "title": "SUPER MANYAO HIGH 167 BPM REMIX 2026 REQ SIA777",
    "channel": "HeNz CheN",
    "duration": 9332,
    "duration_formatted": "2h 35m",
    "url": "https://soundcloud.com/henz_chen/super-manyao-high-167-bpm",
    "artwork": "https://i1.sndcdn.com/artworks-8Oq6SVnEEL1hMyQu-1RksCw-large.jpg"
  },
  {
    "id": "2088329367",
    "title": "FULL JJ LIN & JAY CHOU ♪ DJ MANYAO REMIX FAVORIT SONG 2025 By Mr. Hau",
    "channel": "WnDy",
    "duration": 4979,
    "duration_formatted": "1h 22m",
    "url": "https://soundcloud.com/wandywi/full-jj-lin-jay-chou-dj-manyao-remix-favorit-song-2025-by-mr-hau",
    "artwork": "https://i1.sndcdn.com/artworks-N8dPBK3zwphQZeRo-abxiIg-large.png"
  },
  {
    "id": "2279167010",
    "title": "Breakbeat Mandarin Manyao Wo De Ge Sheng Li X Tiao Lou Ji New Remix 2026",
    "channel": "ReyLimitless",
    "duration": 3943,
    "duration_formatted": "1h 5m",
    "url": "https://soundcloud.com/reylimitless/breakbeat-mandarin-manyao-wo",
    "artwork": "https://i1.sndcdn.com/artworks-CaaiLywlSArmczWy-1RGtbg-large.png"
  },
  {
    "id": "1579893983",
    "title": "MANYAO Chinese EDM Remix 2026",
    "channel": "Mangga2Bet",
    "duration": 9626,
    "duration_formatted": "2h 40m",
    "url": "https://soundcloud.com/wahbi-kopia/manyao-chinese-edm-remix-2023",
    "artwork": "https://i1.sndcdn.com/artworks-6gW6ydrXoXgW3d66-56uH5A-large.jpg"
  },
  {
    "id": "2331874988",
    "title": "SUPER EXCLUSIVE MANYAO REMIX 2026 REQ ALEXEIFINLEY",
    "channel": "HeNz CheN",
    "duration": 5523,
    "duration_formatted": "1h 32m",
    "url": "https://soundcloud.com/henz_chen/super-exclusive-manyao-remix",
    "artwork": "https://i1.sndcdn.com/artworks-2FlOyVz9grmOLspo-m2JoEw-large.jpg"
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
  const count = parseInt(url.searchParams.get("count") || "25", 10);
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
