import GameSettings from './game-settings';

class Sound {
  private readonly audio: HTMLAudioElement;

  constructor(src: string) {
    this.audio = document.createElement('audio');
    this.audio.preload = 'auto';
    this.audio.src = src;
  }

  public play() {
    if (GameSettings.GameBoardSettings.MuteAudio) return;

    const promise: Promise<void> = this.audio.play();
    promise.catch(e => console.log(e));
  }

  public pause() {
    this.audio.pause();
  }
}

export { Sound as default };
