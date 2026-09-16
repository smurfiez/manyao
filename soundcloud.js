/* ============================================================
   Manyao Player — SoundCloud Edition (>1 Hour Mixes)
   ============================================================ */

// ── Curated Starter SoundCloud Manyao Mixes (> 1 hr) ─────────
// ── Curated Starter SoundCloud Manyao Mixes (> 1 hr) ─────────
const DEFAULT_SC_PLAYLIST = [
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

const SC_SEARCH_QUERIES = [
  "manyao nonstop",
  "manyao remix",
  "92ccdj manyao",
  "chinese dj manyao nonstop",
  "manyao club mix",
  "electro manyao nonstop",
  "chinese dj remix nonstop 2026"
];

// ── State ─────────────────────────────────────────────────────
let widget = null;
let playlist = [];
let currentIndex = -1;
let isPlaying = false;
let shuffleOn = false;
let repeatMode = 'off'; // 'off' | 'all' | 'one'
let shuffleOrder = [];
let shufflePosition = -1;
let isDraggingProgress = false;
let isGeneratingTracks = false;
let currentDurationMs = 0;
let currentLoadedUrl = null;
let currentLoadedIndex = -1;
let userExplicitlyPaused = false;
let silentWavDataURI = null;
let lastPositionUpdate = 0;
let mediaSessionHandlersConfigured = false;

// ── DOM Elements ──────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  initAudioSession();
  setupBackgroundLifecycle();
  initSoundCloudWidget();
  loadPlaylist();

  // Generate fresh random Manyao sets (>1 hr)
  generateRandomTracks(25, false);
});

// ── Background Audio Keep-Alive & AudioSession ────────────────
function getSilentWavURI(durationSec = 2, sampleRate = 8000) {
  if (silentWavDataURI) return silentWavDataURI;
  try {
    const numSamples = durationSec * sampleRate;
    const buffer = new ArrayBuffer(44 + numSamples);
    const view = new DataView(buffer);
    function writeString(offset, str) {
      for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    }
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + numSamples, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate, true);
    view.setUint16(32, 1, true);
    view.setUint16(34, 8, true); // 8-bit PCM
    writeString(36, 'data');
    view.setUint32(40, numSamples, true);
    const bytes = new Uint8Array(buffer);
    bytes.fill(0x80, 44);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    silentWavDataURI = 'data:audio/wav;base64,' + btoa(binary);
    return silentWavDataURI;
  } catch (err) {
    console.warn('Failed to build silent WAV data URI:', err);
    return '';
  }
}

function initAudioSession() {
  if (typeof navigator !== 'undefined' && navigator.audioSession) {
    try {
      navigator.audioSession.type = 'playback';
    } catch (err) {
      console.debug('navigator.audioSession setup:', err);
    }
  }
}

function startAudioAnchor() {
  initAudioSession();
  const anchor = $('#bg-audio-anchor');
  if (!anchor) return;
  if (!anchor.src) {
    const uri = getSilentWavURI();
    if (uri) anchor.src = uri;
  }
  anchor.volume = 0.01;
  const playPromise = anchor.play();
  if (playPromise !== undefined) {
    playPromise.catch((err) => {
      console.debug('Audio anchor play deferred/handled:', err);
    });
  }
}

function stopAudioAnchor() {
  const anchor = $('#bg-audio-anchor');
  if (anchor && !anchor.paused) {
    anchor.pause();
  }
}

function setupBackgroundLifecycle() {
  const unlockAudio = () => {
    initAudioSession();
    window.removeEventListener('pointerdown', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
  };
  window.addEventListener('pointerdown', unlockAudio, { passive: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      if (isPlaying && !userExplicitlyPaused) {
        startAudioAnchor();
        if ('mediaSession' in navigator) {
          navigator.mediaSession.playbackState = 'playing';
        }
      }
    } else if (document.visibilityState === 'visible') {
      if (isPlaying && !userExplicitlyPaused) {
        if (widget && typeof widget.isPaused === 'function') {
          widget.isPaused((paused) => {
            if (paused && !userExplicitlyPaused) {
              widget.play();
            }
          });
        }
        updatePlayPauseBtn();
        highlightCurrent();
      }
    }
  });

  window.addEventListener('pagehide', () => {
    if (isPlaying && !userExplicitlyPaused) {
      startAudioAnchor();
    }
  });
}

function loadPlaylist() {
  const saved = localStorage.getItem('manyao-sc-playlist');
  if (saved) {
    try {
      playlist = JSON.parse(saved);
      if (!Array.isArray(playlist) || playlist.length === 0) {
        playlist = [...DEFAULT_SC_PLAYLIST];
      }
    } catch {
      playlist = [...DEFAULT_SC_PLAYLIST];
    }
  } else {
    playlist = [...DEFAULT_SC_PLAYLIST];
  }

  if (playlist.length > 0) {
    currentIndex = 0;
    renderPlaylist();
    updateNowPlayingUI();
  }
}

// ── SoundCloud Widget Integration ─────────────────────────────
function initSoundCloudWidget() {
  const iframe = document.getElementById('sc-widget');
  if (!iframe || typeof SC === 'undefined') {
    setTimeout(initSoundCloudWidget, 200);
    return;
  }

  widget = SC.Widget(iframe);

  widget.bind(SC.Widget.Events.READY, () => {
    console.log('SoundCloud Widget Ready');
    widget.setVolume(80);
  });

  widget.bind(SC.Widget.Events.PLAY, () => {
    isPlaying = true;
    userExplicitlyPaused = false;
    startAudioAnchor();
    updatePlayPauseBtn();
    updateMediaSession();
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'playing';
    }
    highlightCurrent();
  });

  widget.bind(SC.Widget.Events.PAUSE, () => {
    if (document.hidden && !userExplicitlyPaused) {
      startAudioAnchor();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
      setTimeout(() => {
        if (document.hidden && !userExplicitlyPaused && widget) {
          widget.play();
        }
      }, 200);
    } else {
      isPlaying = false;
      stopAudioAnchor();
      updatePlayPauseBtn();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
      highlightCurrent();
    }
  });

  widget.bind(SC.Widget.Events.FINISH, () => {
    handleSongEnd();
  });

  widget.bind(SC.Widget.Events.PLAY_PROGRESS, (data) => {
    if (isDraggingProgress) return;

    const currentSec = data.currentPosition / 1000;
    const durationSec = (data.relativePosition > 0)
      ? currentSec / data.relativePosition
      : (playlist[currentIndex] ? playlist[currentIndex].duration : 3600);

    currentDurationMs = durationSec * 1000;

    const pct = data.relativePosition * 100;
    const bar = $('#progress-filled');
    const timeEl = $('#time-current');
    const durEl = $('#time-duration');

    if (bar) bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
    if (timeEl) timeEl.textContent = formatTime(currentSec);
    if (durEl) durEl.textContent = formatTime(durationSec);

    updateMediaSessionPositionState(currentSec, durationSec);
  });
}

// ── Playback Controls ─────────────────────────────────────────
function playSong(index) {
  if (index < 0 || index >= playlist.length || !widget) return;

  currentIndex = index;
  localStorage.setItem('manyao-sc-current-index', index);

  userExplicitlyPaused = false;
  initAudioSession();
  startAudioAnchor();

  const song = playlist[index];
  isPlaying = true;
  currentLoadedIndex = index;
  currentLoadedUrl = song.url;

  openWidget();

  widget.load(song.url, {
    auto_play: true,
    show_artwork: true,
    hide_related: true,
    show_comments: false,
    show_user: true
  });

  try {
    widget.play();
  } catch (e) {
    console.warn('widget.play error:', e);
  }

  highlightCurrent();
  updateNowPlayingUI();
  updatePlayPauseBtn();
  showNowPlaying();

  const activeEl = $(`.playlist-item[data-index="${index}"]`);
  if (activeEl) {
    activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function togglePlayPause() {
  if (!widget) return;

  if (playlist.length === 0) return;

  const targetIdx = currentIndex >= 0 ? currentIndex : 0;
  if (currentLoadedIndex !== targetIdx || !currentLoadedUrl) {
    playSong(targetIdx);
    return;
  }

  if (isPlaying) {
    userExplicitlyPaused = true;
    widget.pause();
    stopAudioAnchor();
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'paused';
    }
  } else {
    userExplicitlyPaused = false;
    initAudioSession();
    startAudioAnchor();
    widget.play();
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'playing';
    }
  }
}

function playNext() {
  if (playlist.length === 0) return;

  if (shuffleOn) {
    shufflePosition++;
    if (shufflePosition >= shuffleOrder.length) {
      generateShuffleOrder();
      shufflePosition = 0;
    }
    playSong(shuffleOrder[shufflePosition]);
  } else {
    const next = currentIndex + 1;
    if (next >= playlist.length) {
      playSong(0);
    } else {
      playSong(next);
    }
  }
}

function playPrev() {
  if (playlist.length === 0) return;

  if (shuffleOn) {
    shufflePosition--;
    if (shufflePosition < 0) {
      shufflePosition = shuffleOrder.length - 1;
    }
    playSong(shuffleOrder[shufflePosition]);
  } else {
    const prev = currentIndex - 1;
    if (prev < 0) {
      playSong(playlist.length - 1);
    } else {
      playSong(prev);
    }
  }
}

function handleSongEnd() {
  if (repeatMode === 'one') {
    playSong(currentIndex);
  } else {
    playNext();
  }
}

function toggleShuffle() {
  shuffleOn = !shuffleOn;
  const btn = $('#btn-shuffle');
  btn.classList.toggle('active', shuffleOn);
  if (shuffleOn) {
    generateShuffleOrder();
    showToast('Shuffle on');
  } else {
    showToast('Shuffle off');
  }
}

function toggleRepeat() {
  const modes = ['off', 'all', 'one'];
  const idx = modes.indexOf(repeatMode);
  repeatMode = modes[(idx + 1) % modes.length];

  const btn = $('#btn-repeat');
  btn.classList.remove('active', 'repeat-one');

  if (repeatMode === 'all') {
    btn.classList.add('active');
    btn.textContent = '🔁';
    showToast('Repeat all');
  } else if (repeatMode === 'one') {
    btn.classList.add('active', 'repeat-one');
    btn.textContent = '🔂';
    showToast('Repeat one');
  } else {
    btn.textContent = '🔁';
    showToast('Repeat off');
  }
}

function generateShuffleOrder() {
  shuffleOrder = [...Array(playlist.length).keys()];
  for (let i = shuffleOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleOrder[i], shuffleOrder[j]] = [shuffleOrder[j], shuffleOrder[i]];
  }
  shufflePosition = -1;
}

// ── Progress & Seek ───────────────────────────────────────────
function seekTo(event) {
  if (!widget) return;

  const bar = $('#progress-bar');
  const rect = bar.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));

  const song = playlist[currentIndex];
  const totalMs = (song && song.duration) ? song.duration * 1000 : (currentDurationMs || 3600000);

  widget.seekTo(pct * totalMs);
  $('#progress-filled').style.width = (pct * 100) + '%';
}

function setVolume(value) {
  if (widget) {
    widget.setVolume(value);
  }
  const icon = $('#volume-icon');
  if (value == 0) {
    icon.textContent = '🔇';
  } else if (value < 50) {
    icon.textContent = '🔉';
  } else {
    icon.textContent = '🔊';
  }
}

// ── AirPlay & Widget Controls ─────────────────────────────────
function triggerAirPlay() {
  const bridge = $('#airplay-bridge');

  // WebKit native AirPlay target picker (Safari macOS / iOS)
  if (bridge && typeof bridge.webkitShowPlaybackTargetPicker === 'function') {
    try {
      bridge.webkitShowPlaybackTargetPicker();
      showToast('📡 Select an AirPlay device to stream audio', 'info');
      return;
    } catch (err) {
      console.warn('webkitShowPlaybackTargetPicker error:', err);
    }
  }

  // W3C RemotePlayback API (Chrome / Cast)
  if (bridge && bridge.remote && typeof bridge.remote.prompt === 'function') {
    try {
      bridge.remote.prompt();
      showToast('📡 Connecting to wireless display / Cast...', 'info');
      return;
    } catch (err) {
      console.warn('RemotePlayback prompt error:', err);
    }
  }

  toggleWidget();
  showToast('☁ SoundCloud player toggled — use browser audio output or AirPlay menu!', 'info');
}

function toggleWidget() {
  const container = $('#sc-widget-container');
  const btn = $('#btn-toggle-widget');
  container.classList.toggle('minimized');
  if (btn) btn.classList.toggle('active', !container.classList.contains('minimized'));
}

function closeWidget() {
  const container = $('#sc-widget-container');
  const btn = $('#btn-toggle-widget');
  container.classList.add('minimized');
  if (btn) btn.classList.remove('active');
}

function openWidget() {
  const container = $('#sc-widget-container');
  const btn = $('#btn-toggle-widget');
  if (container) container.classList.remove('minimized');
  if (btn) btn.classList.add('active');
}

// ── Search & Random Track Generator (> 1 hr) ─────────────────
async function generateRandomTracks(count = 25, autoPlay = false) {
  if (isGeneratingTracks) return;
  isGeneratingTracks = true;

  const btnRandom = $('#btn-random');
  const btnEmptyRandom = $('#btn-empty-random');
  if (btnRandom) btnRandom.classList.add('loading');
  if (btnEmptyRandom) btnEmptyRandom.classList.add('loading');

  const randomQuery = SC_SEARCH_QUERIES[Math.floor(Math.random() * SC_SEARCH_QUERIES.length)];
  showToast(`🔍 Searching SoundCloud for >1hr "${randomQuery}"...`);

  try {
    const res = await fetch(`/api/soundcloud/search?min_duration=3600&count=${count}&q=${encodeURIComponent(randomQuery)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.tracks && data.tracks.length > 0) {
        playlist = data.tracks;
        currentIndex = 0;
        savePlaylist();
        renderPlaylist();
        updateNowPlayingUI();

        if (autoPlay && widget) {
          playSong(0);
        }

        showToast(`🎲 Generated ${playlist.length} Manyao mixes (>1 hr)!`);
      } else {
        useFallbackPlaylist();
      }
    } else {
      useFallbackPlaylist();
    }
  } catch (err) {
    console.error('SoundCloud search error:', err);
    useFallbackPlaylist();
  } finally {
    isGeneratingTracks = false;
    if (btnRandom) btnRandom.classList.remove('loading');
    if (btnEmptyRandom) btnEmptyRandom.classList.remove('loading');
  }
}

function useFallbackPlaylist() {
  playlist = shuffleArray([...DEFAULT_SC_PLAYLIST]);
  currentIndex = 0;
  savePlaylist();
  renderPlaylist();
  updateNowPlayingUI();
  showToast(`Loaded ${playlist.length} curated Manyao sets (>1 hr)`);
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ── Playlist Management ───────────────────────────────────────
function savePlaylist() {
  localStorage.setItem('manyao-sc-playlist', JSON.stringify(playlist));
}

function addSong(url) {
  if (!url || !url.includes('soundcloud.com')) {
    showToast('Please enter a valid soundcloud.com URL', 'error');
    return false;
  }

  // Extract a clean title from slug
  const parts = url.replace(/\/$/, '').split('/');
  const slug = parts[parts.length - 1] || 'SoundCloud Mix';
  const cleanTitle = decodeURIComponent(slug).replace(/[-_]/g, ' ');

  const song = {
    id: Date.now().toString(),
    title: cleanTitle,
    channel: parts[parts.length - 2] || 'SoundCloud Artist',
    duration: 3600,
    duration_formatted: '> 1 hr',
    url: url,
    artwork: ''
  };

  playlist.push(song);
  savePlaylist();
  renderPlaylist();
  showToast(`Added: ${song.title}`);
  return true;
}

function removeSong(index) {
  if (index < 0 || index >= playlist.length) return;

  const wasPlaying = index === currentIndex;
  playlist.splice(index, 1);

  if (currentIndex > index) {
    currentIndex--;
  } else if (currentIndex === index) {
    if (wasPlaying && playlist.length > 0) {
      currentIndex = Math.min(currentIndex, playlist.length - 1);
      playSong(currentIndex);
    } else if (playlist.length === 0) {
      currentIndex = -1;
      if (widget) widget.pause();
      updateNowPlayingUI();
    }
  }

  savePlaylist();
  renderPlaylist();
}

function clearPlaylist() {
  playlist = [];
  currentIndex = -1;
  if (widget) widget.pause();
  savePlaylist();
  renderPlaylist();
  updateNowPlayingUI();
  showToast('Playlist cleared');
}

// ── UI Rendering ──────────────────────────────────────────────
function renderPlaylist() {
  const container = $('#playlist-container');
  const emptyState = $('#empty-state');

  if (playlist.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  container.innerHTML = playlist.map((song, i) => `
    <div class="playlist-item ${i === currentIndex ? 'active' : ''}"
         data-index="${i}"
         draggable="true">
      <div class="playlist-item-drag" title="Drag to reorder">⠿</div>
      <img class="playlist-item-thumb"
           src="${song.artwork || 'https://a-v2.sndcdn.com/assets/images/default/avatar-large.png'}"
           alt=""
           loading="lazy"
           onerror="this.src='icons/icon-192.png'">
      <div class="playlist-item-info" data-action="play" data-index="${i}">
        <div class="playlist-item-title">
          ${escapeHtml(song.title)}
          <span class="duration-badge long-mix">⏱ ${escapeHtml(song.duration_formatted || '>1h')}</span>
        </div>
        <div class="playlist-item-channel">${escapeHtml(song.channel)}</div>
      </div>
      ${i === currentIndex && isPlaying ? '<div class="visualizer active"><span class="visualizer-bar"></span><span class="visualizer-bar"></span><span class="visualizer-bar"></span><span class="visualizer-bar"></span></div>' : ''}
      <button class="playlist-item-delete" data-action="delete" data-index="${i}" title="Remove">✕</button>
    </div>
  `).join('');

  setupDragAndDrop();
}

function highlightCurrent() {
  $$('.playlist-item').forEach((el, i) => {
    el.classList.toggle('active', i === currentIndex);
    const existingVis = el.querySelector('.visualizer');
    if (i === currentIndex && isPlaying) {
      if (!existingVis) {
        const vis = document.createElement('div');
        vis.className = 'visualizer active';
        vis.innerHTML = '<span class="visualizer-bar"></span><span class="visualizer-bar"></span><span class="visualizer-bar"></span><span class="visualizer-bar"></span>';
        const delBtn = el.querySelector('.playlist-item-delete');
        if (delBtn) el.insertBefore(vis, delBtn);
        else el.appendChild(vis);
      }
    } else if (existingVis) {
      existingVis.remove();
    }
  });
}

function updateNowPlayingUI() {
  const titleEl = $('#np-title');
  const channelEl = $('#np-channel');
  const thumbEl = $('#np-thumb');
  const extBtn = $('#btn-open-external');

  if (currentIndex >= 0 && currentIndex < playlist.length) {
    const song = playlist[currentIndex];
    titleEl.innerHTML = `${escapeHtml(song.title)} <span class="duration-badge long-mix">⏱ ${escapeHtml(song.duration_formatted || '>1h')}</span>`;
    channelEl.textContent = song.channel;
    thumbEl.src = song.artwork || 'icons/icon-192.png';
    thumbEl.classList.remove('hidden');

    if (extBtn) {
      extBtn.href = song.url;
      extBtn.classList.remove('hidden');
    }
  } else {
    titleEl.textContent = 'No mix selected';
    channelEl.textContent = 'Click Random Mixes to load Manyao sets';
    thumbEl.classList.add('hidden');

    if (extBtn) {
      extBtn.href = 'https://soundcloud.com';
      extBtn.classList.add('hidden');
    }
  }
}

function updatePlayPauseBtn() {
  const btn = $('#btn-play');
  btn.textContent = isPlaying ? '⏸' : '▶';
  btn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
}

function showNowPlaying() {
  const bar = $('#now-playing');
  bar.classList.add('visible');
}

// ── Modals & Drag-and-Drop ────────────────────────────────────
function openAddModal() {
  const overlay = $('#modal-overlay');
  overlay.classList.add('open');
  setTimeout(() => $('#url-input').focus(), 100);
}

function closeAddModal() {
  const overlay = $('#modal-overlay');
  overlay.classList.remove('open');
  $('#url-input').value = '';
}

function handleAddSong() {
  const input = $('#url-input');
  const url = input.value.trim();
  if (!url) return;

  if (addSong(url)) {
    closeAddModal();
  }
}

let draggedIndex = null;
function setupDragAndDrop() {
  const items = $$('.playlist-item');
  items.forEach((item) => {
    item.addEventListener('dragstart', (e) => {
      draggedIndex = parseInt(item.dataset.index, 10);
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      draggedIndex = null;
      $$('.playlist-item').forEach((el) => el.classList.remove('drag-over'));
    });
    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      item.classList.add('drag-over');
    });
    item.addEventListener('dragleave', () => {
      item.classList.remove('drag-over');
    });
    item.addEventListener('drop', (e) => {
      e.preventDefault();
      const targetIndex = parseInt(item.dataset.index, 10);
      if (draggedIndex !== null && draggedIndex !== targetIndex) {
        const [moved] = playlist.splice(draggedIndex, 1);
        playlist.splice(targetIndex, 0, moved);
        if (currentIndex === draggedIndex) {
          currentIndex = targetIndex;
        } else if (draggedIndex < currentIndex && targetIndex >= currentIndex) {
          currentIndex--;
        } else if (draggedIndex > currentIndex && targetIndex <= currentIndex) {
          currentIndex++;
        }
        savePlaylist();
        renderPlaylist();
      }
    });
  });
}

function showToast(message, type = 'info') {
  const container = $('#toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ── MediaSession API ──────────────────────────────────────────
function updateMediaSession() {
  if (!('mediaSession' in navigator) || currentIndex < 0) return;
  const song = playlist[currentIndex];
  navigator.mediaSession.metadata = new MediaMetadata({
    title: song.title,
    artist: song.channel,
    album: 'Manyao Player (SoundCloud >1 hr)',
    artwork: [
      { src: song.artwork || 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: song.artwork || 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  });

  navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';

  setupMediaSessionActionHandlers();
}

function updateMediaSessionPositionState(currentTime, duration) {
  if (!('mediaSession' in navigator) || !navigator.mediaSession.setPositionState) return;
  const now = Date.now();
  if (now - lastPositionUpdate < 1000) return;
  lastPositionUpdate = now;

  if (duration && duration > 0 && !isNaN(currentTime) && !isNaN(duration)) {
    try {
      navigator.mediaSession.setPositionState({
        duration: Math.max(0, duration),
        playbackRate: 1,
        position: Math.min(Math.max(0, currentTime), duration)
      });
    } catch (e) {
      // Ignored if position state is temporarily unsupported
    }
  }
}

function setupMediaSessionActionHandlers() {
  if (!('mediaSession' in navigator) || mediaSessionHandlersConfigured) return;
  mediaSessionHandlersConfigured = true;

  const handlers = [
    ['play', () => {
      userExplicitlyPaused = false;
      initAudioSession();
      startAudioAnchor();
      if (widget) {
        widget.play();
      } else if (currentIndex >= 0) {
        playSong(currentIndex);
      }
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
    }],
    ['pause', () => {
      userExplicitlyPaused = true;
      if (widget) {
        widget.pause();
      }
      stopAudioAnchor();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
    }],
    ['previoustrack', () => playPrev()],
    ['nexttrack', () => playNext()],
    ['seekto', (details) => {
      if (details.seekTime !== undefined && details.seekTime !== null && widget) {
        widget.seekTo(details.seekTime * 1000);
      }
    }],
    ['seekforward', (details) => {
      const offset = (details.seekOffset || 10) * 1000;
      if (widget && typeof widget.getPosition === 'function') {
        widget.getPosition((pos) => {
          widget.seekTo(pos + offset);
        });
      }
    }],
    ['seekbackward', (details) => {
      const offset = (details.seekOffset || 10) * 1000;
      if (widget && typeof widget.getPosition === 'function') {
        widget.getPosition((pos) => {
          widget.seekTo(Math.max(0, pos - offset));
        });
      }
    }],
    ['stop', () => {
      userExplicitlyPaused = true;
      if (widget) {
        widget.pause();
      }
      stopAudioAnchor();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'none';
      }
    }]
  ];

  for (const [action, handler] of handlers) {
    try {
      navigator.mediaSession.setActionHandler(action, handler);
    } catch (e) {
      console.debug(`MediaSession action ${action} not supported:`, e);
    }
  }
}

// ── Event Listeners ───────────────────────────────────────────
function setupEventListeners() {
  $('#btn-random').addEventListener('click', () => generateRandomTracks(25, true));
  const emptyBtn = $('#btn-empty-random');
  if (emptyBtn) {
    emptyBtn.addEventListener('click', () => generateRandomTracks(25, true));
  }

  $('#btn-play').addEventListener('click', togglePlayPause);
  $('#btn-next').addEventListener('click', playNext);
  $('#btn-prev').addEventListener('click', playPrev);
  $('#btn-shuffle').addEventListener('click', toggleShuffle);
  $('#btn-repeat').addEventListener('click', toggleRepeat);

  const btnAirplay = $('#btn-airplay');
  if (btnAirplay) {
    btnAirplay.addEventListener('click', triggerAirPlay);
  }

  const btnToggleWidget = $('#btn-toggle-widget');
  if (btnToggleWidget) {
    btnToggleWidget.addEventListener('click', toggleWidget);
  }

  const btnCloseWidget = $('#btn-close-widget');
  if (btnCloseWidget) {
    btnCloseWidget.addEventListener('click', closeWidget);
  }

  const progressBar = $('#progress-bar');
  progressBar.addEventListener('click', seekTo);
  progressBar.addEventListener('mousedown', () => { isDraggingProgress = true; });
  progressBar.addEventListener('mousemove', (e) => {
    if (isDraggingProgress) seekTo(e);
  });
  document.addEventListener('mouseup', () => { isDraggingProgress = false; });

  progressBar.addEventListener('touchstart', (e) => {
    isDraggingProgress = true;
    seekTo(e.touches[0]);
  }, { passive: true });
  progressBar.addEventListener('touchmove', (e) => {
    if (isDraggingProgress) seekTo(e);
  }, { passive: true });
  progressBar.addEventListener('touchend', () => { isDraggingProgress = false; });

  const volumeSlider = $('#volume-slider');
  volumeSlider.addEventListener('input', (e) => setVolume(e.target.value));

  $('#playlist-container').addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) {
      const item = e.target.closest('.playlist-item');
      if (item) playSong(parseInt(item.dataset.index, 10));
      return;
    }
    const action = target.dataset.action;
    const index = parseInt(target.dataset.index, 10);
    if (action === 'play') playSong(index);
    else if (action === 'delete') {
      e.stopPropagation();
      removeSong(index);
    }
  });

  $('#btn-add').addEventListener('click', openAddModal);
  $('#modal-close').addEventListener('click', closeAddModal);
  $('#modal-cancel').addEventListener('click', closeAddModal);
  $('#btn-add-confirm').addEventListener('click', handleAddSong);
  $('#modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeAddModal();
  });
  $('#url-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAddSong();
  });

  $('#btn-clear').addEventListener('click', () => {
    if (confirm('Clear the entire playlist?')) clearPlaylist();
  });
  $('#btn-reset').addEventListener('click', () => {
    generateRandomTracks(25, true);
  });

  // WebKit AirPlay Target Availability Monitoring
  if (window.WebKitPlaybackTargetAvailabilityEvent) {
    const bridge = $('#airplay-bridge');
    if (bridge && btnAirplay) {
      bridge.addEventListener('webkitplaybacktargetavailabilitychanged', (e) => {
        if (e.availability === 'available') {
          btnAirplay.classList.add('available');
          btnAirplay.title = 'AirPlay Available — Click to Stream';
        } else {
          btnAirplay.classList.remove('available');
        }
      });
      bridge.addEventListener('webkitcurrentplaybacktargetiswirelesschanged', () => {
        btnAirplay.classList.toggle('active', bridge.webkitCurrentPlaybackTargetIsWireless);
      });
    }
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    switch (e.code) {
      case 'Space':
        e.preventDefault();
        togglePlayPause();
        break;
      case 'ArrowRight':
        e.preventDefault();
        playNext();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        playPrev();
        break;
      case 'KeyS':
        toggleShuffle();
        break;
      case 'KeyR':
        toggleRepeat();
        break;
      case 'KeyA':
        openAddModal();
        break;
      case 'KeyG':
        generateRandomTracks(25, true);
        break;
      case 'KeyV':
        toggleWidget();
        break;
      case 'KeyP':
        triggerAirPlay();
        break;
    }
  });
}

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}
