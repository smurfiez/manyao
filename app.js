/* ============================================================
   Manyao Player — Core Application Logic
   ============================================================ */

// ── Curated Real Manyao Fallback Pool ─────────────────────────
// ── Curated Real Manyao Fallback Pool (> 1 hr) ────────────────
const DEFAULT_PLAYLIST = [
  { id: 'eG0PXloNT1s', title: 'NONSTOP MANYAO MANDARIN HIGH REMIX 2025 SPECIAL REQ BY StevArsJayden1899', channel: 'StevArsJayden', duration: 11642, duration_formatted: '3h 14m' },
  { id: 'zRdUAPPPdP8', title: 'DeeJay AK《2小时最新快摇串烧》超劲爆节奏 强劲来袭 | 92CCDJ Release', channel: '92CCDJ', duration: 7433, duration_formatted: '2h 3m' },
  { id: 'n65BaTbQIpY', title: '#92CCDJ - 預謀 x 愛妳 x 走心 x 愛河 x 煙幕 ╳ 全新中文慢摇连续大碟', channel: '92CCDJ', duration: 3665, duration_formatted: '1h 1m' },
  { id: '2xJcOnaF7Ck', title: '㊣92CCDJ - 2025慢搖《超好聽》天真的橡皮 x 我曾經發了瘋的想 x 車載音樂串燒', channel: '92CCDJ', duration: 4055, duration_formatted: '1h 7m' },
  { id: 'CgI0mvecgA8', title: 'DJ-MJ Nonstop V64 2025【偏向 X 跳楼机 X 执子之手 X 谦让 X 青花 X 满天星辰不及你】', channel: 'DJ-MJ Official', duration: 4025, duration_formatted: '1h 7m' },
  { id: '98zOmuP-YXA', title: 'DJKY 全中文DJ舞曲🔥大头针翻唱｜泪海 ✘ 水手 ✘ 记事本 ✘ 出卖 Electro ReMix 2025', channel: 'Ky Music', duration: 3644, duration_formatted: '1h 0m' },
  { id: 'g3OpaY2BBJw', title: '全中文慢摇 最好聽的慢搖舞曲 DJ FC FONG REMIX | 92CCDJ Release', channel: '92CCDJ', duration: 5477, duration_formatted: '1h 31m' },
  { id: 'r2Fqh_-fDw0', title: 'MANYAO NONSTOP - 再给我一分钟时间 - ELECTRO MANYAO REMIX 2026', channel: 'Minsex Manyao', duration: 4533, duration_formatted: '1h 15m' },
  { id: '7de1SE79vyQ', title: 'MANYAO NONSTOP - 再给我一分钟时间 - VINABOUNCE REMIX 2026', channel: 'Minsex Manyao', duration: 4586, duration_formatted: '1h 16m' },
  { id: 'mopbmaijjWY', title: '2026 DJ\'YE NONSTOP MANYAO SONG OINSO MUSIC', channel: 'Oinso Music', duration: 3811, duration_formatted: '1h 3m' }
];

const MANYAO_SEARCH_QUERIES = [
  'manyao mix 1 hour',
  '92ccdj 慢摇 1小时',
  'chinese dj nonstop 1 hour',
  '全中文慢摇 连续大碟 2026',
  'manyao nonstop dj 2026',
  '全中文慢摇 劲爆夜店重低音 1小时',
  '慢摇 串烧 1小时以上',
  'electro manyao continuous mix 1 hour',
  '慢摇 重低音 舞曲 1小时',
  'chinese manyao edm nonstop 1 hour'
];

// ── State ─────────────────────────────────────────────────────
let player = null;
let playlist = [];
let currentIndex = -1;
let isPlaying = false;
let shuffleOn = false;
let repeatMode = 'off'; // 'off' | 'all' | 'one'
let shuffleOrder = [];
let shufflePosition = -1;
let progressInterval = null;
let isDraggingProgress = false;
let isGeneratingTracks = false;
let currentLoadedId = null;
let userExplicitlyPaused = false;
let silentWavDataURI = null;
let lastPositionUpdate = 0;
let mediaSessionHandlersConfigured = false;

// ── SkipCut Player & SponsorBlock State ───────────────────────
let sponsorSegments = [];
let lastSkippedSegment = null;
const SPONSORBLOCK_CATEGORIES = [
  "sponsor",
  "selfpromo",
  "interaction",
  "intro",
  "outro",
  "preview",
  "music_offtopic",
  "filler"
];

// ── DOM Elements ──────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  initAudioSession();
  setupBackgroundLifecycle();
  loadYouTubeAPI();

  // Always generate fresh random manyao tracks on start from YouTube API
  generateRandomTracks(10, false);
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
  // Setup user gesture unlock for audio session
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
        if (player && typeof player.getPlayerState === 'function') {
          const state = player.getPlayerState();
          if (state !== YT.PlayerState.PLAYING && state !== YT.PlayerState.BUFFERING) {
            player.playVideo();
          }
        }
        updatePlayPauseBtn();
        highlightCurrent();
        startProgressUpdater();
      }
    }
  });

  window.addEventListener('pagehide', () => {
    if (isPlaying && !userExplicitlyPaused) {
      startAudioAnchor();
    }
  });
}

// ── YouTube IFrame API (SkipCut Engine) ─────────────────────────
function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
}

// Called by YouTube API when ready
window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player('yt-player', {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      disablekb: 0,
      fs: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      cc_load_policy: 0,
      playsinline: 1,
      origin: window.location.origin,
      enablejsapi: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onError: onPlayerError
    }
  });
};

function onPlayerReady() {
  console.log('YouTube Player ready');
  ensureIframeAirPlayAttributes();
  if (playlist.length > 0) {
    if (currentIndex < 0) currentIndex = 0;
    updateNowPlayingUI();
    highlightCurrent();
  }
}

function onPlayerStateChange(event) {
  switch (event.data) {
    case YT.PlayerState.PLAYING:
      isPlaying = true;
      userExplicitlyPaused = false;
      startAudioAnchor();
      updatePlayPauseBtn();
      startProgressUpdater();
      updateMediaSession();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
      highlightCurrent();
      break;
    case YT.PlayerState.PAUSED:
      if (document.hidden && !userExplicitlyPaused) {
        // Paused by OS backgrounding heuristic — maintain mediaSession and audio anchor
        startAudioAnchor();
        if ('mediaSession' in navigator) {
          navigator.mediaSession.playbackState = 'playing';
        }
        setTimeout(() => {
          if (document.hidden && !userExplicitlyPaused && player && typeof player.playVideo === 'function') {
            player.playVideo();
          }
        }, 200);
      } else {
        isPlaying = false;
        updatePlayPauseBtn();
        stopProgressUpdater();
        stopAudioAnchor();
        if ('mediaSession' in navigator) {
          navigator.mediaSession.playbackState = 'paused';
        }
        highlightCurrent();
      }
      break;
    case YT.PlayerState.ENDED:
      isPlaying = false;
      updatePlayPauseBtn();
      stopProgressUpdater();
      stopAudioAnchor();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'none';
      }
      handleSongEnd();
      break;
    case YT.PlayerState.BUFFERING:
      break;
  }
}

function onPlayerError(event) {
  console.error('YouTube Player error:', event.data);
  const errorMessages = {
    2: 'Invalid video ID',
    5: 'HTML5 player error',
    100: 'Video not found or private',
    101: 'Embedding not allowed',
    150: 'Embedding not allowed'
  };
  showToast(errorMessages[event.data] || 'Playback error — skipping to next', 'error');
  setTimeout(() => playNext(), 1200);
}

// ── SkipCut SponsorBlock Integration ──────────────────────────
async function fetchSponsorSegments(videoId) {
  sponsorSegments = [];
  lastSkippedSegment = null;
  if (!videoId) return;

  try {
    const categoriesParam = JSON.stringify(SPONSORBLOCK_CATEGORIES);
    const url = `https://sponsor.ajay.app/api/skipSegments?videoID=${videoId}&categories=${encodeURIComponent(categoriesParam)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        sponsorSegments = data;
        console.log(`[SkipCut] Loaded ${data.length} sponsor/ad segment(s) for video ${videoId}`);
      }
    }
  } catch (err) {
    console.warn('[SkipCut] SponsorBlock fetch error:', err);
  }
}

function checkAndSkipSponsorSegments(currentTime) {
  if (!player || sponsorSegments.length === 0) return;

  for (const item of sponsorSegments) {
    if (!item.segment) continue;
    const [start, end] = item.segment;
    const uuid = item.UUID || `${start}-${end}`;

    if (currentTime >= start && currentTime < end && lastSkippedSegment !== uuid) {
      lastSkippedSegment = uuid;
      const skipSeconds = end - start;
      player.seekTo(end, true);

      const catLabel = item.category ? item.category.replace('_', ' ') : 'ad segment';
      showToast(`⚡ SkipCut: Skipped ${catLabel} (${skipSeconds.toFixed(1)}s)`);
      break;
    }
  }
}

// ── AirPlay & Video Player Controls ───────────────────────────
function ensureIframeAirPlayAttributes() {
  const iframe = (player && typeof player.getIframe === 'function')
    ? player.getIframe()
    : document.querySelector('#yt-player-container iframe');
  if (iframe) {
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; airplay; fullscreen');
    iframe.setAttribute('x-webkit-airplay', 'allow');
    iframe.setAttribute('allowfullscreen', 'true');
  }
}

function triggerAirPlay() {
  const bridge = $('#airplay-bridge');
  const btnAirplay = $('#btn-airplay');

  // Option 1: WebKit native AirPlay target picker (Safari macOS / iOS)
  if (bridge && typeof bridge.webkitShowPlaybackTargetPicker === 'function') {
    try {
      bridge.webkitShowPlaybackTargetPicker();
      showToast('📡 Select an AirPlay device to stream audio', 'info');
      openVideoPlayer();
      return;
    } catch (err) {
      console.warn('webkitShowPlaybackTargetPicker error:', err);
    }
  }

  // Option 2: W3C RemotePlayback API (Chrome / Cast)
  if (bridge && bridge.remote && typeof bridge.remote.prompt === 'function') {
    try {
      bridge.remote.prompt();
      showToast('📡 Connecting to wireless display / Cast...', 'info');
      return;
    } catch (err) {
      console.warn('RemotePlayback prompt error:', err);
    }
  }

  // Option 3: Expand video player for native AirPlay & Picture-in-Picture controls
  openVideoPlayer();
  showToast('📺 Video view open — tap the AirPlay icon or Fullscreen (⛶) to stream!', 'info');
}

function toggleVideoPlayer() {
  const container = $('#yt-player-container');
  const btn = $('#btn-toggle-video');
  const isMinimized = container.classList.contains('minimized');

  if (isMinimized) {
    openVideoPlayer();
  } else {
    closeVideoPlayer();
  }
}

function openVideoPlayer() {
  const container = $('#yt-player-container');
  const btn = $('#btn-toggle-video');
  container.classList.remove('minimized');
  if (btn) btn.classList.add('active');
  ensureIframeAirPlayAttributes();
}

function closeVideoPlayer() {
  const container = $('#yt-player-container');
  const btn = $('#btn-toggle-video');
  container.classList.add('minimized');
  if (btn) btn.classList.remove('active');
}

function toggleVideoFullscreen() {
  const container = $('#yt-player-container');
  if (!document.fullscreenElement) {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

async function togglePictureInPicture() {
  // Document Picture-in-Picture API (Chrome 116+, Android)
  if (window.documentPictureInPicture && typeof window.documentPictureInPicture.requestWindow === 'function') {
    try {
      const container = $('#yt-player-container');
      openVideoPlayer();
      const pipWindow = await window.documentPictureInPicture.requestWindow({
        width: 480,
        height: 320
      });
      pipWindow.document.body.style.margin = '0';
      pipWindow.document.body.style.background = '#0a0a0f';
      pipWindow.document.body.appendChild(container);
      pipWindow.addEventListener('pagehide', () => {
        document.querySelector('.app-container').appendChild(container);
      });
      showToast('⧉ Picture-in-Picture window opened!', 'success');
      return;
    } catch (err) {
      console.warn('Document PiP request error:', err);
    }
  }

  // Fallback for Safari & mobile browsers: reveal video container for native controls
  openVideoPlayer();
  showToast('📺 Video view active — swipe up or tap fullscreen for background PiP', 'info');
}

// ── Playback Controls ─────────────────────────────────────────
function playSong(index) {
  if (index < 0 || index >= playlist.length || !player) return;

  currentIndex = index;
  localStorage.setItem('manyao-current-index', index);

  userExplicitlyPaused = false;
  initAudioSession();
  startAudioAnchor();

  const song = playlist[index];
  currentLoadedId = song.id;
  player.loadVideoById(song.id);
  isPlaying = true;

  // SkipCut: Fetch SponsorBlock ad & sponsor segments
  fetchSponsorSegments(song.id);

  // Ensure AirPlay permissions on iframe
  setTimeout(ensureIframeAirPlayAttributes, 600);

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
  if (!player) return;

  if (playlist.length === 0) return;

  const targetIdx = currentIndex >= 0 ? currentIndex : 0;
  if (!currentLoadedId || (playlist[targetIdx] && playlist[targetIdx].id !== currentLoadedId)) {
    playSong(targetIdx);
    return;
  }

  if (isPlaying) {
    userExplicitlyPaused = true;
    player.pauseVideo();
    stopAudioAnchor();
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'paused';
    }
  } else {
    userExplicitlyPaused = false;
    initAudioSession();
    startAudioAnchor();
    player.playVideo();
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
      if (repeatMode === 'all') {
        generateShuffleOrder();
        shufflePosition = 0;
      } else {
        isPlaying = false;
        updatePlayPauseBtn();
        return;
      }
    }
    playSong(shuffleOrder[shufflePosition]);
  } else {
    const next = currentIndex + 1;
    if (next >= playlist.length) {
      if (repeatMode === 'all') {
        playSong(0);
      } else {
        isPlaying = false;
        updatePlayPauseBtn();
      }
    } else {
      playSong(next);
    }
  }
}

function playPrev() {
  if (playlist.length === 0) return;

  if (player && player.getCurrentTime && player.getCurrentTime() > 3) {
    player.seekTo(0);
    return;
  }

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
    showToast('Repeat all');
  } else if (repeatMode === 'one') {
    btn.classList.add('active', 'repeat-one');
    showToast('Repeat one');
  } else {
    showToast('Repeat off');
  }

  updateRepeatIcon();
}

function updateRepeatIcon() {
  const btn = $('#btn-repeat');
  if (repeatMode === 'one') {
    btn.textContent = '🔂';
  } else {
    btn.textContent = '🔁';
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

// ── Progress & Volume ─────────────────────────────────────────
function startProgressUpdater() {
  stopProgressUpdater();
  progressInterval = setInterval(updateProgress, 250);
}

function stopProgressUpdater() {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
}

function updateProgress() {
  if (!player || !player.getDuration || isDraggingProgress) return;

  const duration = player.getDuration();
  const current = player.getCurrentTime();

  // SkipCut: check and skip sponsor / ad segments
  checkAndSkipSponsorSegments(current);

  if (duration > 0) {
    const pct = (current / duration) * 100;
    const bar = $('#progress-filled');
    const timeEl = $('#time-current');
    const durEl = $('#time-duration');

    if (bar) bar.style.width = pct + '%';
    if (timeEl) timeEl.textContent = formatTime(current);
    if (durEl) durEl.textContent = formatTime(duration);

    updateMediaSessionPositionState(current, duration);
  }
}

function seekTo(event) {
  if (!player || !player.getDuration) return;

  const bar = $('#progress-bar');
  const rect = bar.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  const duration = player.getDuration();

  player.seekTo(pct * duration, true);
  $('#progress-filled').style.width = (pct * 100) + '%';
}

function setVolume(value) {
  if (player && player.setVolume) {
    player.setVolume(value);
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

// ── YouTube API Searching & Random Track Generation ──────────
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function fetchManyaoFromAPI(query, count = 10) {
  const apiKey = localStorage.getItem('manyao-yt-api-key');

  // Option 1: User's YouTube Data API v3 key if set
  if (apiKey) {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${Math.max(count * 2, 20)}&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const videos = data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            channel: item.snippet.channelTitle
          }));
          return shuffleArray(videos).slice(0, count);
        }
      }
    } catch (err) {
      console.warn('YouTube Data API key search failed, using local server:', err);
    }
  }

  // Option 2: Built-in local server endpoint /api/search
  try {
    const res = await fetch(`/api/search?min_duration=3600&count=${count}&q=${encodeURIComponent(query)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.tracks && data.tracks.length > 0) {
        return data.tracks;
      }
    }
  } catch (err) {
    console.warn('Local /api/search fetch error:', err);
  }

  // Option 3: Offline curated Manyao pool
  return shuffleArray([...DEFAULT_PLAYLIST]).slice(0, count);
}

async function generateRandomTracks(count = 10, autoPlay = false) {
  if (isGeneratingTracks) return;
  isGeneratingTracks = true;

  const btnRandom = $('#btn-random');
  const btnEmptyRandom = $('#btn-empty-random');
  if (btnRandom) btnRandom.classList.add('loading');
  if (btnEmptyRandom) btnEmptyRandom.classList.add('loading');

  const randomQuery = MANYAO_SEARCH_QUERIES[Math.floor(Math.random() * MANYAO_SEARCH_QUERIES.length)];
  showToast(`🔍 Searching YouTube for "${randomQuery}"...`);

  try {
    const tracks = await fetchManyaoFromAPI(randomQuery, count);
    if (tracks && tracks.length > 0) {
      playlist = tracks;
      currentIndex = 0;
      savePlaylist();
      renderPlaylist();
      updateNowPlayingUI();

      if (autoPlay && player && typeof player.loadVideoById === 'function') {
        playSong(0);
      } else if (player && typeof player.cueVideoById === 'function') {
        player.cueVideoById(playlist[0].id);
      }

      showToast(`🎲 Generated ${tracks.length} fresh Manyao tracks!`);
    } else {
      showToast('Could not fetch new tracks, using fallback', 'error');
    }
  } catch (err) {
    console.error('generateRandomTracks error:', err);
    showToast('Failed to generate tracks', 'error');
  } finally {
    isGeneratingTracks = false;
    if (btnRandom) btnRandom.classList.remove('loading');
    if (btnEmptyRandom) btnEmptyRandom.classList.remove('loading');
  }
}

// ── Playlist Management ───────────────────────────────────────
function loadPlaylist() {
  const saved = localStorage.getItem('manyao-playlist');
  if (saved) {
    try {
      playlist = JSON.parse(saved);
    } catch {
      playlist = [...DEFAULT_PLAYLIST];
    }
  } else {
    playlist = [...DEFAULT_PLAYLIST];
  }
}

function savePlaylist() {
  localStorage.setItem('manyao-playlist', JSON.stringify(playlist));
}

function addSong(url) {
  const videoId = extractVideoId(url);
  if (!videoId) {
    showToast('Invalid YouTube URL', 'error');
    return false;
  }

  if (playlist.some((s) => s.id === videoId)) {
    showToast('Song already in playlist', 'error');
    return false;
  }

  fetchVideoInfo(videoId).then((info) => {
    const song = {
      id: videoId,
      title: info.title || 'Unknown Track',
      channel: info.author_name || 'Unknown Artist'
    };

    playlist.push(song);
    savePlaylist();
    renderPlaylist();
    showToast(`Added: ${song.title}`);

    if (shuffleOn) {
      generateShuffleOrder();
    }
  });

  return true;
}

async function fetchVideoInfo(videoId) {
  try {
    const resp = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
    if (!resp.ok) throw new Error('Fetch failed');
    return await resp.json();
  } catch {
    return { title: `Video ${videoId}`, author_name: 'Unknown' };
  }
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
      if (player) player.stopVideo();
      updateNowPlayingUI();
    }
  }

  savePlaylist();
  renderPlaylist();

  if (shuffleOn) {
    generateShuffleOrder();
  }
}

function clearPlaylist() {
  playlist = [];
  currentIndex = -1;
  if (player) player.stopVideo();
  savePlaylist();
  renderPlaylist();
  updateNowPlayingUI();
  showToast('Playlist cleared');
}

function resetToDefault() {
  generateRandomTracks(10, true);
}

// ── URL Parsing ───────────────────────────────────────────────
function extractVideoId(url) {
  if (!url) return null;
  url = url.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  const patterns = [
    /(?:youtube\.com\/watch\?.*v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
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
           src="https://i.ytimg.com/vi/${song.id}/default.jpg"
           alt=""
           loading="lazy">
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
  });
  renderPlaylist();
}

function updateNowPlayingUI() {
  const titleEl = $('#np-title');
  const channelEl = $('#np-channel');
  const thumbEl = $('#np-thumb');
  const skipcutBtn = $('#btn-open-skipcut');

  if (currentIndex >= 0 && currentIndex < playlist.length) {
    const song = playlist[currentIndex];
    titleEl.innerHTML = `${escapeHtml(song.title)} <span class="duration-badge long-mix">⏱ ${escapeHtml(song.duration_formatted || '>1h')}</span>`;
    channelEl.textContent = song.channel;
    thumbEl.src = `https://i.ytimg.com/vi/${song.id}/default.jpg`;
    thumbEl.classList.remove('hidden');

    if (skipcutBtn) {
      skipcutBtn.href = `https://skipcut.com/?v=${song.id}`;
      skipcutBtn.classList.remove('hidden');
    }
  } else {
    titleEl.textContent = 'No song selected';
    channelEl.textContent = 'Click Random or Add songs to get started';
    thumbEl.classList.add('hidden');

    if (skipcutBtn) {
      skipcutBtn.href = 'https://skipcut.com';
      skipcutBtn.classList.add('hidden');
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

// ── Modals ────────────────────────────────────────────────────
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

function openSettingsModal() {
  const overlay = $('#settings-modal-overlay');
  const input = $('#yt-api-key-input');
  input.value = localStorage.getItem('manyao-yt-api-key') || '';
  overlay.classList.add('open');
  setTimeout(() => input.focus(), 100);
}

function closeSettingsModal() {
  const overlay = $('#settings-modal-overlay');
  overlay.classList.remove('open');
}

function saveSettings() {
  const input = $('#yt-api-key-input');
  const val = input.value.trim();
  if (val) {
    localStorage.setItem('manyao-yt-api-key', val);
    showToast('YouTube API Key saved!');
  } else {
    localStorage.removeItem('manyao-yt-api-key');
    showToast('Using built-in YouTube search engine');
  }
  closeSettingsModal();
}

// ── Toast Notifications ───────────────────────────────────────
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

// ── MediaSession API (lock screen controls) ───────────────────
function updateMediaSession() {
  if (!('mediaSession' in navigator) || currentIndex < 0) return;

  const song = playlist[currentIndex];

  navigator.mediaSession.metadata = new MediaMetadata({
    title: song.title,
    artist: song.channel,
    album: 'Manyao Player (>1 hr)',
    artwork: [
      { src: `https://i.ytimg.com/vi/${song.id}/default.jpg`, sizes: '120x90', type: 'image/jpeg' },
      { src: `https://i.ytimg.com/vi/${song.id}/mqdefault.jpg`, sizes: '320x180', type: 'image/jpeg' },
      { src: `https://i.ytimg.com/vi/${song.id}/hqdefault.jpg`, sizes: '480x360', type: 'image/jpeg' },
      { src: `https://i.ytimg.com/vi/${song.id}/maxresdefault.jpg`, sizes: '1280x720', type: 'image/jpeg' },
      { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
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
      if (player && typeof player.playVideo === 'function') {
        player.playVideo();
      } else if (currentIndex >= 0) {
        playSong(currentIndex);
      }
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
    }],
    ['pause', () => {
      userExplicitlyPaused = true;
      if (player && typeof player.pauseVideo === 'function') {
        player.pauseVideo();
      }
      stopAudioAnchor();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
    }],
    ['previoustrack', () => playPrev()],
    ['nexttrack', () => playNext()],
    ['seekto', (details) => {
      if (details.seekTime !== undefined && details.seekTime !== null && player && typeof player.seekTo === 'function') {
        player.seekTo(details.seekTime, true);
        if (player.getDuration) updateProgress();
      }
    }],
    ['seekforward', (details) => {
      const offset = details.seekOffset || 10;
      if (player && typeof player.getCurrentTime === 'function' && typeof player.seekTo === 'function') {
        const cur = player.getCurrentTime() || 0;
        player.seekTo(cur + offset, true);
      }
    }],
    ['seekbackward', (details) => {
      const offset = details.seekOffset || 10;
      if (player && typeof player.getCurrentTime === 'function' && typeof player.seekTo === 'function') {
        const cur = player.getCurrentTime() || 0;
        player.seekTo(Math.max(0, cur - offset), true);
      }
    }],
    ['stop', () => {
      userExplicitlyPaused = true;
      if (player && typeof player.stopVideo === 'function') {
        player.stopVideo();
      } else if (player && typeof player.pauseVideo === 'function') {
        player.pauseVideo();
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

// ── Drag & Drop Reordering ────────────────────────────────────
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

// ── Event Listeners ───────────────────────────────────────────
function setupEventListeners() {
  // Random Manyao generator buttons
  $('#btn-random').addEventListener('click', () => generateRandomTracks(10, true));
  const emptyBtn = $('#btn-empty-random');
  if (emptyBtn) {
    emptyBtn.addEventListener('click', () => generateRandomTracks(10, true));
  }

  // Playback controls
  $('#btn-play').addEventListener('click', togglePlayPause);
  $('#btn-next').addEventListener('click', playNext);
  $('#btn-prev').addEventListener('click', playPrev);
  $('#btn-shuffle').addEventListener('click', toggleShuffle);
  $('#btn-repeat').addEventListener('click', toggleRepeat);

  // Progress bar
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

  // Volume
  const volumeSlider = $('#volume-slider');
  volumeSlider.addEventListener('input', (e) => setVolume(e.target.value));

  // Playlist clicks (event delegation)
  $('#playlist-container').addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) {
      const item = e.target.closest('.playlist-item');
      if (item) {
        playSong(parseInt(item.dataset.index, 10));
      }
      return;
    }

    const action = target.dataset.action;
    const index = parseInt(target.dataset.index, 10);

    if (action === 'play') {
      playSong(index);
    } else if (action === 'delete') {
      e.stopPropagation();
      removeSong(index);
    }
  });

  // Add song modal
  $('#btn-add').addEventListener('click', openAddModal);
  $('#modal-close').addEventListener('click', closeAddModal);
  $('#modal-cancel').addEventListener('click', closeAddModal);
  $('#btn-add-confirm').addEventListener('click', handleAddSong);
  $('#modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeAddModal();
  });

  // Settings modal
  $('#btn-settings').addEventListener('click', openSettingsModal);
  $('#settings-modal-close').addEventListener('click', closeSettingsModal);
  $('#settings-modal-cancel').addEventListener('click', closeSettingsModal);
  $('#btn-save-settings').addEventListener('click', saveSettings);
  $('#settings-modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeSettingsModal();
  });

  // Enter key in URL input
  $('#url-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAddSong();
  });

  // Menu buttons
  $('#btn-clear').addEventListener('click', () => {
    if (confirm('Clear the entire playlist?')) clearPlaylist();
  });
  $('#btn-reset').addEventListener('click', () => {
    generateRandomTracks(10, true);
  });

  // AirPlay and Video Mini-Player
  const btnAirplay = $('#btn-airplay');
  if (btnAirplay) {
    btnAirplay.addEventListener('click', triggerAirPlay);
  }

  const btnToggleVideo = $('#btn-toggle-video');
  if (btnToggleVideo) {
    btnToggleVideo.addEventListener('click', toggleVideoPlayer);
  }

  const btnCloseVideo = $('#btn-close-video');
  if (btnCloseVideo) {
    btnCloseVideo.addEventListener('click', closeVideoPlayer);
  }

  const btnFullscreenVideo = $('#btn-fullscreen-video');
  if (btnFullscreenVideo) {
    btnFullscreenVideo.addEventListener('click', toggleVideoFullscreen);
  }

  const btnPipVideo = $('#btn-pip-video');
  if (btnPipVideo) {
    btnPipVideo.addEventListener('click', togglePictureInPicture);
  }

  // WebKit AirPlay Target Availability Monitoring
  if (window.WebKitPlaybackTargetAvailabilityEvent) {
    const bridge = $('#airplay-bridge');
    if (bridge) {
      bridge.addEventListener('webkitplaybacktargetavailabilitychanged', (e) => {
        if (btnAirplay) {
          if (e.availability === 'available') {
            btnAirplay.classList.add('available');
            btnAirplay.title = 'AirPlay Available — Click to Stream';
          } else {
            btnAirplay.classList.remove('available');
          }
        }
      });

      bridge.addEventListener('webkitcurrentplaybacktargetiswirelesschanged', () => {
        if (btnAirplay) {
          btnAirplay.classList.toggle('active', bridge.webkitCurrentPlaybackTargetIsWireless);
          if (bridge.webkitCurrentPlaybackTargetIsWireless) {
            showToast('📡 Connected to AirPlay device');
          }
        }
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
        generateRandomTracks(10, true);
        break;
      case 'KeyV':
        toggleVideoPlayer();
        break;
      case 'KeyP':
        triggerAirPlay();
        break;
    }
  });
}

// ── Utilities ─────────────────────────────────────────────────
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ── Service Worker Registration ───────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('SW registered:', reg.scope))
      .catch((err) => console.log('SW registration failed:', err));
  });
}
