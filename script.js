const STATIONS = [
  { name: "Techno ", src: "./audio/good-night-lofi-cozy-chill-music-160166.mp3", video: "./video/1760556389183077.mp4" },
  { name: "Dine ",   src: "./audio/lofi-lofi-music-405237.mp3",   video: "./video/1760556308497161.mp4"   },
  { name: "Fog ",   src: "./audio/lofi-study-calm-peaceful-chill-hop-112191.mp3",    video: "./video/techno.mp4"   },
  { name: "Nature ", src: "./audio/On The Flip - The Grey Room _ Density & Time.mp3",  video: "./video/nature.mp4" },
  { name: "Library ", src: "./audio/Resolution Or Reflection - The Grey Room _ Clark Sims.mp3", video: "./video/1760556105321562.mp4" },
  { name: "Cafe ",   src: "./audio/Twinkle - The Grey Room _ Density & Time.mp3",   video: "./video/203645-921832577_medium.mp4"   },
];

const STATIC =[
    {src:"./video/1760558368427181.mp4"}
]

const STATIC_DURATION = 450; // ms to show static before switching
let staticTimer = null;

function playStaticThenSwitch(nextSrc) {
  if (!bgVideo) return;

  try {
    if (staticTimer) clearTimeout(staticTimer);

    const staticSrc = (STATIC[0] && STATIC[0].src) || "";


    bgVideo.muted = true;
    bgVideo.playsInline = true;
    bgVideo.autoplay = true;
    bgVideo.src = staticSrc;
    bgVideo.load();
    bgVideo.play().catch(() => {});


    staticTimer = setTimeout(() => {
      bgVideo.src = nextSrc || staticSrc; // fallback to static if missing
      bgVideo.load();
      bgVideo.play().catch(() => {});
    }, STATIC_DURATION);
  } catch {}
}


const player   = document.getElementById("player"); 
const playBtn  = document.getElementById("playBtn");  
const prevBtn  = document.getElementById("prevBtn"); 
const nextBtn  = document.getElementById("nextBtn"); 
const nowName  = document.getElementById("nowName");  
const bgVideo  = document.getElementById("bgVideo"); 

player.loop = true;        

let stationIndex = 0;      
let isPlaying = false;    

player.addEventListener("play",  () => { isPlaying = true;  updatePlayBtn(); });
player.addEventListener("pause", () => { isPlaying = false; updatePlayBtn(); });

playBtn.addEventListener("click", () => {
  if (player.paused) player.play().catch(()=>{}); else player.pause();
});


prevBtn.addEventListener("click", pickRandomStation);
nextBtn.addEventListener("click", pickRandomStation);

function selectStation(i, { autoplay = true } = {}) {
  stationIndex = ((i % STATIONS.length) + STATIONS.length) % STATIONS.length;

  const s = STATIONS[stationIndex];

  // audio
  player.src = s.src;
  nowName.textContent = s.name;

  // video: static transition first, then target video
  if (bgVideo) {
    const targetVideo = s.video || (STATIC[0] && STATIC[0].src) || "";
    playStaticThenSwitch(targetVideo);
  }

  // reset audio time
  try { player.currentTime = 0; } catch {}

  if (autoplay) {
    try { player.autoplay = true; player.load(); } catch {}
    player.play().catch(() => {});
  }
}


function pickRandomStation() {
  if (STATIONS.length <= 1) return; // nothing to change
  let r = stationIndex;
  for (let tries = 0; tries < 10 && r === stationIndex; tries++) {
    r = Math.floor(Math.random() * STATIONS.length);
  }
  selectStation(r, { autoplay: true });
}

function updatePlayBtn() {
  playBtn.textContent = isPlaying ? "Pause" : "Play";
}

document.addEventListener("DOMContentLoaded", () => {
  stationIndex = Math.floor(Math.random() * STATIONS.length);
  selectStation(stationIndex, { autoplay: true });
});
  
window.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
    pickRandomStation();
  }
  if (e.code === "Space" || e.key === " ") {
    e.preventDefault(); 
    if (player.paused) player.play().catch(()=>{}); else player.pause();
    return;
  }

});

const button = document.getElementById("fullscreen-btn");

    button.addEventListener("click",()=>{
        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen();
        }else{
            document.exitFullscreen();
        }
    })