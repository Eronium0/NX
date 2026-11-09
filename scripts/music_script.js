/* music player script */

const audio = document.getElementById('myAudio');
const playPauseButton = document.getElementById('playPause');
const progressBar = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const trackTitle = document.getElementById('track-list');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const nowPlayingDisplay = document.getElementById('track-title');
const slider = document.getElementById('volume');

let currentTrack = 0;
const track = trackTitle.querySelectorAll('li');

if (track.length > 0) {
    loadTrack(0);
}

playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audio.pause();
        playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i> ';
    }
});

prevButton.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + track.length) % track.length;
    loadTrack(currentTrack);
    audio.play();
    playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
});

nextButton.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % track.length;
    loadTrack(currentTrack);
    audio.play();
    playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
});

audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % track.length;
    loadTrack(currentTrack);
    audio.play();
});

trackTitle.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const trackIndex = Array.from(trackTitle.children).indexOf(e.target);
        currentTrack = trackIndex;
        loadTrack(currentTrack);
        audio.play();
        playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
});

function loadTrack(index) {
    const selectedTrack = track[index];
    audio.src = selectedTrack.getAttribute('data-src');
    progressBar.style.width = '0%';
    currentTimeDisplay.textContent = '0:00';
    durationDisplay.textContent = '0:00';
    nowPlayingDisplay.textContent = `Now Playing: ${selectedTrack.textContent}`;
    track.forEach(item => item.classList.remove('active'));
    selectedTrack.classList.add('active');
}

audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const progressBarContainer = document.getElementById('progress-bar');

progressBarContainer.addEventListener('click', (e) => {
    const rect = progressBarContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    audio.currentTime = (clickX / rect.width) * audio.duration;
});

const handleInput = (eslide) =>{
    const min = eslide.min || 0;
    const max = eslide.max || 100;
    const pct = (eslide.value - min) / (max - min) * 100;
    eslide.style.setProperty('--range-pct', pct + '%');
};

slider.addEventListener('input', (el) =>{ 
    handleInput(el.target);
    audio.volume = el.target.value;
});
handleInput(slider);

