/**
 * referencias:
 * eventos disponiveis: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
 * 
 **/


var player = document.getElementById('player');
var playerContainer = document.getElementById('video-player');
var i = 0;
var currentTime = 0;
var videoDuration = 0;
var thumbnailContainer = document.createElement("div");
var canvasImage = document.createElement("canvas");
var videoIsPlaying = false;

player.addEventListener('mouseleave', (e) => {
  var el = document.getElementById('thumbnail-preview');
  if (videoIsPlaying && el != null) {
    el.remove()
  }
});


//TODO: pegar evento de stop, para n mostrar o preview 
//TODO: mostrar o preview apenas qunado dar hover na barra de progresso (atualemnte esta no video todo) 
player.addEventListener('mouseenter', (e) => {
  if (videoIsPlaying) {
    thumbnailContainer.classList.add('thumbnail-container');
    thumbnailContainer.setAttribute("id", "thumbnail-preview")
    playerContainer.appendChild(thumbnailContainer);
    thumbnailContainer.appendChild(canvasImage);
  }
});

player.addEventListener('mousemove', (e) => {
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
