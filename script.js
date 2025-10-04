const playBtn = document.getElementById("play-btn");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const playlist = [
    {
        src: "mortals/mortals.mp3",
        title: "Mortals",
        artist: "Warriyo - NCS Release",
        cover: "mortals/mortals.jpg"
    },
    {
        src: "montagem_favela/montagem_favela.mp3",
        title: "Montagem Favela",
        artist: "CHASHKAKEFIRA - NCS Release",
        cover: "montagem_favela/montagem_favela.jpg" 
    }
];

let isPlaying = false;
let currentTrack = 0;

function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    document.querySelector(".title").textContent = track.title;
    document.querySelector(".artist").textContent = track.artist;
    document.querySelector(".big-cover").src = track.cover;
    document.querySelector(".cover").src = track.cover;
}
loadTrack(currentTrack);

// Play / Pause
playBtn.addEventListener("click", () => {
    const icon = playBtn.querySelector("i");
    if (isPlaying) {
        audio.pause();
        icon.classList.replace("fa-pause-circle", "fa-play-circle");
    } else {
        audio.play();
        icon.classList.replace("fa-play-circle", "fa-pause-circle");
    }
    isPlaying = !isPlaying;
});

document.querySelector(".fa-step-forward").parentElement.addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
    playBtn.querySelector("i").classList.replace("fa-play-circle", "fa-pause-circle");
    isPlaying = true;
});

document.querySelector(".fa-step-backward").parentElement.addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
    playBtn.querySelector("i").classList.replace("fa-play-circle", "fa-pause-circle");
    isPlaying = true;
});


// Mettre à jour la barre et le temps
audio.addEventListener("timeupdate", () => {
    const current = audio.currentTime;
    const duration = audio.duration;

    // Avancement en %
    const progressPercent = (current / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Temps écoulé
    const minutes = Math.floor(current / 60);
    const seconds = Math.floor(current % 60).toString().padStart(2, "0");
    currentTimeEl.textContent = `${minutes}:${seconds}`;

    // Durée totale (quand c’est connu)
    if (!isNaN(duration)) {
        const dMinutes = Math.floor(duration / 60);
        const dSeconds = Math.floor(duration % 60).toString().padStart(2, "0");
        durationEl.textContent = `${dMinutes}:${dSeconds}`;
    }
});
