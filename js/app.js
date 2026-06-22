(() => {
  const els = {
    searchForm: document.getElementById("search-form"),
    searchInput: document.getElementById("search-input"),
    tracksHeading: document.getElementById("tracks-heading"),
    trackCount: document.getElementById("track-count"),
    trackList: document.getElementById("track-list"),
    loading: document.getElementById("loading"),
    errorMessage: document.getElementById("error-message"),
    albumArt: document.getElementById("album-art"),
    albumArtPlaceholder: document.getElementById("album-art-placeholder"),
    nowPlayingTitle: document.getElementById("now-playing-title"),
    nowPlayingArtist: document.getElementById("now-playing-artist"),
    progressFill: document.getElementById("progress-fill"),
    progressBar: document.querySelector(".progress-bar"),
    currentTime: document.getElementById("current-time"),
    totalTime: document.getElementById("total-time"),
    playBtn: document.getElementById("play-btn"),
    playIcon: document.getElementById("play-icon"),
    pauseIcon: document.getElementById("pause-icon"),
    prevBtn: document.getElementById("prev-btn"),
    nextBtn: document.getElementById("next-btn"),
    volumeSlider: document.getElementById("volume-slider"),
    audio: document.getElementById("audio-player"),
  };

  let tracks = [];
  let currentIndex = -1;
  let isPlaying = false;

  function formatTime(seconds) {
    if (!seconds || Number.isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  function setLoading(show) {
    els.loading.hidden = !show;
  }

  function showError(message) {
    els.errorMessage.textContent = message;
    els.errorMessage.hidden = !message;
  }

  function renderTracks() {
    els.trackList.innerHTML = "";
    els.trackCount.textContent = tracks.length ? `${tracks.length} tracks` : "";

    tracks.forEach((track, index) => {
      const li = document.createElement("li");
      li.className = "track-item" + (index === currentIndex ? " active" : "");
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", index === currentIndex ? "true" : "false");
      li.dataset.index = index;

      const cover = track.album?.cover_small || track.album?.cover || "";
      const artist = track.artist?.name || "Unknown Artist";

      li.innerHTML = `
        <img src="${cover}" alt="" loading="lazy" width="48" height="48">
        <div class="track-item-info">
          <div class="track-item-title">${escapeHtml(track.title)}</div>
          <div class="track-item-artist">${escapeHtml(artist)}</div>
        </div>
        <span class="track-item-duration">${formatTime(track.duration)}</span>
      `;

      li.addEventListener("click", () => selectTrack(index, true));
      els.trackList.appendChild(li);
    });

    updateNavButtons();
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function updateNowPlaying(track) {
    if (!track) return;

    const cover = track.album?.cover_big || track.album?.cover_medium || track.album?.cover || "";

    els.nowPlayingTitle.textContent = track.title;
    els.nowPlayingArtist.textContent = track.artist?.name || "Unknown Artist";

    if (cover) {
      els.albumArt.src = cover;
      els.albumArt.alt = `${track.title} album cover`;
      els.albumArt.classList.add("visible");
      els.albumArtPlaceholder.classList.add("hidden");
    } else {
      els.albumArt.classList.remove("visible");
      els.albumArtPlaceholder.classList.remove("hidden");
    }

    els.totalTime.textContent = formatTime(track.duration);
  }

  function selectTrack(index, autoPlay = false) {
    if (index < 0 || index >= tracks.length) return;

    currentIndex = index;
    const track = tracks[index];

    if (!track.preview) {
      showError("This track has no preview available. Try another one.");
      renderTracks();
      return;
    }

    showError("");
    updateNowPlaying(track);
    renderTracks();

    els.audio.src = track.preview;
    els.playBtn.disabled = false;

    if (autoPlay) {
      play();
    } else {
      els.progressFill.style.width = "0%";
      els.currentTime.textContent = "0:00";
      setPlayState(false);
    }
  }

  function play() {
    if (currentIndex < 0) return;
    els.audio.play().then(() => setPlayState(true)).catch(() => {
      showError("Playback failed. Your browser may block autoplay.");
    });
  }

  function pause() {
    els.audio.pause();
    setPlayState(false);
  }

  function togglePlay() {
    if (isPlaying) pause();
    else play();
  }

  function setPlayState(playing) {
    isPlaying = playing;
    els.playIcon.hidden = playing;
    els.pauseIcon.hidden = !playing;
    els.playBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
  }

  function updateNavButtons() {
    els.prevBtn.disabled = currentIndex <= 0;
    els.nextBtn.disabled = currentIndex >= tracks.length - 1 || currentIndex < 0;
  }

  function playNext() {
    if (currentIndex < tracks.length - 1) {
      selectTrack(currentIndex + 1, true);
    }
  }

  function playPrev() {
    if (currentIndex > 0) {
      selectTrack(currentIndex - 1, true);
    }
  }

  function updateProgress() {
    const { currentTime, duration } = els.audio;
    const pct = duration ? (currentTime / duration) * 100 : 0;
    els.progressFill.style.width = `${pct}%`;
    els.progressBar.setAttribute("aria-valuenow", Math.round(pct));
    els.currentTime.textContent = formatTime(currentTime);
  }

  function seek(e) {
    if (!els.audio.duration) return;
    const rect = els.progressBar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    els.audio.currentTime = ratio * els.audio.duration;
  }

  async function loadChart() {
    els.tracksHeading.textContent = "Trending Tracks";
    setLoading(true);
    showError("");

    try {
      const data = await DeezerAPI.getChartTracks(25);
      tracks = (data.data || []).filter((t) => t.preview);
      renderTracks();
    } catch (err) {
      showError(err.message || "Could not load tracks.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    const query = els.searchInput.value.trim();
    if (!query) return;

    els.tracksHeading.textContent = `Results for "${query}"`;
    setLoading(true);
    showError("");

    try {
      const data = await DeezerAPI.searchTracks(query, 25);
      tracks = (data.data || []).filter((t) => t.preview);

      if (!tracks.length) {
        showError("No previewable tracks found. Try a different search.");
      }

      currentIndex = -1;
      renderTracks();
    } catch (err) {
      showError(err.message || "Search failed.");
    } finally {
      setLoading(false);
    }
  }

  els.searchForm.addEventListener("submit", handleSearch);
  els.playBtn.addEventListener("click", togglePlay);
  els.nextBtn.addEventListener("click", playNext);
  els.prevBtn.addEventListener("click", playPrev);
  els.progressBar.addEventListener("click", seek);
  els.volumeSlider.addEventListener("input", () => {
    els.audio.volume = els.volumeSlider.value / 100;
  });

  els.audio.addEventListener("timeupdate", updateProgress);
  els.audio.addEventListener("ended", playNext);
  els.audio.addEventListener("play", () => setPlayState(true));
  els.audio.addEventListener("pause", () => setPlayState(false));

  els.audio.volume = els.volumeSlider.value / 100;
  loadChart();
})();
