/* ============================================================
   Manyao Player — SoundCloud Edition (>1 Hour Mixes)
   ============================================================ */

// ── Curated Starter SoundCloud Manyao Mixes (> 1 hr) ─────────
const DEFAULT_SC_PLAYLIST = [
  {
    id: "1230001",
    title: "NONSTOP MANYAO REMIX 2022",
    channel: "Sean Lu",
    duration: 6765,
    duration_formatted: "1h 52m",
    url: "https://soundcloud.com/seanjaya-ludy/manyao-2022",
    artwork: "https://i1.sndcdn.com/artworks-2L8NvaNLofCUroYS-rEggug-large.jpg"
  },
  {
    id: "1230002",
    title: "MANYAO REMIX TERBARU",
    channel: "manyao edm",
    duration: 7138,
    duration_formatted: "1h 58m",
    url: "https://soundcloud.com/manyao-edm/manyao-remix-terbaru",
    artwork: "https://i1.sndcdn.com/artworks-5Zc6F9NxfBLockpS-JZdP3g-large.jpg"
  },
  {
    id: "1230003",
    title: "DJ MANYAO MANDARIN GACOR NONSTOP 2026 !!!",
    channel: "iniawaw",
    duration: 3672,
    duration_formatted: "1h 1m",
    url: "https://soundcloud.com/iniawaw/dj-manyao-mandarin-gacor",
    artwork: "https://i1.sndcdn.com/artworks-odGVkXnd67dXOZHc-TYrMHw-large.png"
  },
  {
    id: "1230004",
    title: "MANYAO NONSTOP MIX 2026 🔥 BINGBIAN メ JUMPING MACHINE メ TONGHUA",
    channel: "Pan-strex",
    duration: 5360,
    duration_formatted: "1h 29m",
    url: "https://soundcloud.com/pan-strex/manyao-nonstop-mix-2026",
    artwork: "https://i1.sndcdn.com/artworks-1yQsklvAMwrlmmgd-RSEltA-large.jpg"
  },
  {
    id: "1230005",
    title: "SPECIAL MANYAO REMIX ANTI DROP 2026",
    channel: "BANGHO",
    duration: 9648,
    duration_formatted: "2h 40m",
    url: "https://soundcloud.com/bangho/special-manyao-remix-anti-drop",
    artwork: "https://i1.sndcdn.com/artworks-odGVkXnd67dXOZHc-TYrMHw-large.png"
  },
  {
    id: "1230006",
    title: "摇头夜店舞曲 Hardstyle - Hardcore Nonstop Chinese DJ Disco Remix",
    channel: "Jonny Chan",
    duration: 5854,
    duration_formatted: "1h 37m",
    url: "https://soundcloud.com/jonny-chan-791788730/hardstyle-hardcore-nonstop",
    artwork: "https://i1.sndcdn.com/artworks-5QpERKiDj6NcCdvQ-ST64EA-large.png"
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

// ── DOM Elements ──────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  initSoundCloudWidget();

  // Load saved playlist or fetch fresh >1hr Manyao sets
  const saved = localStorage.getItem('manyao-sc-playlist');
  if (saved) {
    try {
      playlist = JSON.parse(saved);
      if (playlist.length > 0) {
        currentIndex = 0;
        renderPlaylist();
        updateNowPlayingUI();
      }
    } catch {
      playlist = [];
    }
  }

  // Generate fresh random Manyao sets (>1 hr)
  generateRandomTracks(10, false);
});

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
    updatePlayPauseBtn();
    updateMediaSession();
    highlightCurrent();
  });

  widget.bind(SC.Widget.Events.PAUSE, () => {
    isPlaying = false;
    updatePlayPauseBtn();
    highlightCurrent();
  });

  widget.bind(SC.Widget.Events.FINISH, () => {
    isPlaying = false;
    updatePlayPauseBtn();
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
  });
}

// ── Playback Controls ─────────────────────────────────────────
function playSong(index) {
  if (index < 0 || index >= playlist.length || !widget) return;

  currentIndex = index;
  localStorage.setItem('manyao-sc-current-index', index);

  const song = playlist[index];
  isPlaying = true;

  widget.load(song.url, {
    auto_play: true,
    color: '#ff5500',
    show_comments: false,
    hide_related: true,
    callback: () => {
      widget.play();
    }
  });

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

  if (currentIndex === -1 && playlist.length > 0) {
    playSong(0);
    return;
  }

  widget.toggle();
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

// ── Search & Random Track Generator (> 1 hr) ─────────────────
async function generateRandomTracks(count = 10, autoPlay = false) {
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
  });
  renderPlaylist();
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
    album: 'Manyao Player (SoundCloud)',
    artwork: [
      { src: song.artwork || 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  });
  navigator.mediaSession.setActionHandler('play', () => togglePlayPause());
  navigator.mediaSession.setActionHandler('pause', () => togglePlayPause());
  navigator.mediaSession.setActionHandler('previoustrack', () => playPrev());
  navigator.mediaSession.setActionHandler('nexttrack', () => playNext());
}

// ── Event Listeners ───────────────────────────────────────────
function setupEventListeners() {
  $('#btn-random').addEventListener('click', () => generateRandomTracks(10, true));
  const emptyBtn = $('#btn-empty-random');
  if (emptyBtn) {
    emptyBtn.addEventListener('click', () => generateRandomTracks(10, true));
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
    generateRandomTracks(10, true);
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
        generateRandomTracks(10, true);
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
