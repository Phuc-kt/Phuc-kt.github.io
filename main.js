// clock
const clock = document.getElementById('clock');
const date = document.getElementById('date');

function updateTime() {
    if (!clock || !date) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    date.textContent = now.toLocaleDateString(undefined, options);
}

setInterval(updateTime, 1000);
updateTime();


// Audio
const audio = document.getElementById('my-audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = '<i class="fas fa-play"></i>';
const pauseIcon = '<i class="fas fa-pause"></i>';

const progressBarContainer = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar');
const trackTitle = document.getElementById('track-title');

if (audio && playPauseBtn) {
    try {
        if (trackTitle && (!trackTitle.textContent || trackTitle.textContent.trim() === '')) {
            const src = audio.getAttribute('src') || '';
            const name = src.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
            trackTitle.textContent = name || 'Unknown track';
        }
    } catch (e) {
    }
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) audio.play();
        else audio.pause();
    });

    audio.addEventListener('play', () => {
        playPauseBtn.innerHTML = pauseIcon;
        playPauseBtn.setAttribute('aria-pressed', 'true');
    });

    audio.addEventListener('pause', () => {
        playPauseBtn.innerHTML = playIcon;
        playPauseBtn.setAttribute('aria-pressed', 'false');
    });

    audio.addEventListener('ended', () => {
        playPauseBtn.innerHTML = playIcon;
        progressBar.style.width = '0%';
    });

    audio.addEventListener('timeupdate', () => {
        const { currentTime, duration } = audio;
        if (!duration || Number.isNaN(duration) || duration === 0) return;
        const progressPercent = (currentTime / duration) * 100;
        if (progressBar) progressBar.style.width = `${progressPercent}%`;
    });

    audio.addEventListener('loadedmetadata', () => {
        if (audio.currentTime === 0 && progressBar) progressBar.style.width = '0%';
    });

    if (progressBarContainer) {
        progressBarContainer.addEventListener('click', (event) => {
            const rect = progressBarContainer.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const width = rect.width || progressBarContainer.clientWidth;
            const duration = audio.duration || 0;
            if (!duration) return; // can't seek if unknown duration
            const newTime = (clickX / width) * duration;
            audio.currentTime = Math.max(0, Math.min(newTime, duration));
        });

        progressBarContainer.setAttribute('tabindex', '0');
        progressBarContainer.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.key === ' ') {
                e.preventDefault();
                if (audio.paused) audio.play(); else audio.pause();
            }
        });
    }
} else {
    console.warn('Audio element or controls missing from page; audio features disabled.');
}