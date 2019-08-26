class Sound {
  audio: HTMLAudioElement;

  constructor(src: string) {
    this.audio = document.createElement('audio');
    this.audio.preload = 'auto';
    this.audio.src = src;
  }

  play() {
    const promise: Promise<void> = this.audio.play();
    promise.catch(e => console.log(e));
  }

  pause() {
    this.audio.pause();
  }
}

export { Sound as default };
