export default class Sound {
  constructor(src) {
    this.audio = document.createElement('audio');
    this.audio.src = src;
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }
}
