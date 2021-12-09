/**
 * referencias:
 * eventos disponiveis: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
 * 
 **/


var player = document.getElementById('player');
var playerContainer = document.getElementById('video-player');
var progressBar = document.getElementById('progress-bar');
var currentTime = 0;
var videoDuration = 0;
var thumbnailContainer = document.createElement("div");
var canvasImage = document.createElement("canvas");
var videoIsPlaying = false;

progressBar.addEventListener('mouseleave', (e) => {
  var el = document.getElementById('thumbnail-preview');
  if (videoIsPlaying && el != null) {
    el.remove()
  }
});

//TODO: mostrar o preview apenas qunado dar hover na barra de progresso (atualemnte esta no video todo) 
progressBar.addEventListener('mouseenter', (e) => {
  if (videoIsPlaying) {
    thumbnailContainer.classList.add('thumbnail-container');
    thumbnailContainer.setAttribute("id", "thumbnail-preview")
    playerContainer.appendChild(thumbnailContainer);
    thumbnailContainer.appendChild(canvasImage);
  }
});

progressBar.addEventListener('mousemove', (e) => {
  const safeOffset = 80;
  thumbnailContainer.style.left = `${(e.clientX) - safeOffset}px`;
});

player.addEventListener('loadeddata', (_) => {
  videoDuration = player.duration;
  currentTime = 0;
});

player.addEventListener('playing', (_) => {
  videoIsPlaying = true;
});

player.addEventListener('seeking', (event) => {
  currentTime = event.target.currentTime;
  generateThumbnail();
});

player.addEventListener('seeked', (_) => {
  generateThumbnail();
});


function generateThumbnail() {
  var canvasContext = canvasImage.getContext('2d');
  canvasContext.drawImage(player, 0, 0, 150, 100);
}

function play() {
  if (videoIsPlaying) {
    videoIsPlaying = false;
    player.pause()
  } else {
    videoIsPlaying = true;
    player.play();
    var listenduration = setInterval(() => playEvent(listenduration), 100);
  }
}

function playEvent(listenduration) {
  if (!videoIsPlaying) {
    clearInterval(listenduration);
  }
  var barPercentage = (player.currentTime / videoDuration) * 100;
  progressBar.style.width = `${barPercentage}%`
  if (barPercentage == 100) {
    clearInterval(listenduration);
  }
}