
var musicBtn = document.getElementById('musicBtn');
var musicCircleBtn = document.getElementById('musicCircleBtn');
var audio = new Audio('[BTCLOD.COM] Adventures – A Himitsu (No Copyright Music)-320k.MP3');


musicBtn.addEventListener('click', () => {
  musicCircleBtn.classList.toggle("musicOn");
  musicBtn.classList.toggle("music-on-BG");
  playMusic();
}); 



function playMusic() {
  if (musicCircleBtn.classList.contains('musicOn')){
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}

