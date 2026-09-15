/* ============================================================
   Manyao Player — Core Application Logic
   ============================================================ */

// ── Curated Real Manyao Fallback Pool ─────────────────────────
const DEFAULT_PLAYLIST = [
  { id: 'o_-FGAVcNiE', title: '《 Manyao Lover 》【预谋 ✘ 我是真的爱上你 ✘ 我的驕傲】Electro Manyao Remix', channel: 'Manyao Lover' },
  { id: 'p6d649lKI8U', title: '㊣92CCDJ New Manyao Mix 168bpm 🎶 若月亮没来 x 其实都没有 x 姑娘别哭泣', channel: '92CCDJ' },
  { id: 'CIpXLEnIrXE', title: '♪ MK ReMIX ♪【 今晚我是你的人 ● 淚海 ● 年輕不懂愛 ● 騙子 】MANYAO MIX', channel: 'MK ReMIX' },
  { id: 'wU5kED22rC4', title: 'DjKY『海屿你➢跳楼机➢雨是神的烟火➢善后➢草戒指➢我太笨➢泪海』Mixtape 2026', channel: 'Ky Music' },
  { id: 'y-A2ObGD1t4', title: '海屿你 X 离开我的依赖 X 可惜不是你 X 泪海 X 大海【大头针特辑】DJ-MJ Nonstop', channel: 'DJ-MJ Official' },
  { id: '_Mo-X71BJ0Q', title: '2026年最棒的DJ混音音樂 慢摇 嗨曲 经典老歌重低音全中文', channel: 'DJ Manyao Mix' },
  { id: 'kJYvK_3C96E', title: '全中文慢摇 越南鼓 抖音劲爆舞曲 EDM 2026', channel: 'Manyao Nation' },
  { id: 'V1bFr2SWP1I', title: '92CCDJ 慢摇串烧 - 嗨翻全场夜店酒吧重低音', channel: '92CCDJ' },
  { id: '5l5o6JqQe2I', title: '慢摇 嗨曲 舞曲 2026 Electro Manyao Club DJ Mix', channel: 'Manyao Club' },
  { id: '7t0mC9H8qZ4', title: '慢摇 经典老歌 DJ 混音 - 一路向北 / 晴天 / 搁浅 慢摇版', channel: 'Manyao KTV' }
];

const MANYAO_SEARCH_QUERIES = [
  'manyao remix 慢摇',
  '慢摇 嗨曲 2026',
  '92ccdj manyao mix',
  '全中文慢摇 舞曲',
  'manyao lover remix',
  '夜店慢摇 嗨曲',
  'electro manyao remix',
  '越南鼓 慢摇 remix',
  'dj 慢摇 连版 2026',
  '慢摇 重低音 舞曲',
  '经典老歌慢摇 remix',
  '抖音慢摇 dj remix'
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
  loadYouTubeAPI();

  // Always generate fresh random manyao tracks on start from YouTube API
  generateRandomTracks(10, false);
});

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
      updatePlayPauseBtn();
      startProgressUpdater();
      updateMediaSession();
      highlightCurrent();
      break;
    case YT.PlayerState.PAUSED:
      isPlaying = false;
      updatePlayPauseBtn();
      stopProgressUpdater();
      highlightCurrent();
      break;
    case YT.PlayerState.ENDED:
      isPlaying = false;
      updatePlayPauseBtn();
      stopProgressUpdater();
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

// ── Playback Controls ─────────────────────────────────────────
function playSong(index) {
  if (index < 0 || index >= playlist.length || !player) return;

  currentIndex = index;
  localStorage.setItem('manyao-current-index', index);

  const song = playlist[index];
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

  if (currentIndex === -1 && playlist.length > 0) {
    playSong(0);
    return;
  }

  if (isPlaying) {
    player.pauseVideo();
  } else {
    player.playVideo();
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
    const res = await fetch(`/api/search?count=${count}&q=${encodeURIComponent(query)}`);
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
        <div class="playlist-item-title">${escapeHtml(song.title)}</div>
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
    titleEl.textContent = song.title;
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
    album: 'Manyao Player',
    artwork: [
      { src: `https://i.ytimg.com/vi/${song.id}/default.jpg`, sizes: '120x90', type: 'image/jpeg' },
      { src: `https://i.ytimg.com/vi/${song.id}/mqdefault.jpg`, sizes: '320x180', type: 'image/jpeg' },
      { src: `https://i.ytimg.com/vi/${song.id}/hqdefault.jpg`, sizes: '480x360', type: 'image/jpeg' }
    ]
  });

  navigator.mediaSession.setActionHandler('play', () => togglePlayPause());
  navigator.mediaSession.setActionHandler('pause', () => togglePlayPause());
  navigator.mediaSession.setActionHandler('previoustrack', () => playPrev());
  navigator.mediaSession.setActionHandler('nexttrack', () => playNext());
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
