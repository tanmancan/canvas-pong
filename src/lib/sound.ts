import GameSettings from './game-settings';

class Sound {
  private readonly audio?: HTMLAudioElement;

  constructor(src: string) {
    if (typeof document === 'undefined') return;
    this.audio = document.createElement('audio');
    this.audio.preload = 'auto';
    this.audio.src = src;
  }

  public play(): void {
    if (GameSettings.GameBoardSettings.MuteAudio || !this.audio) return;

    const promise: Promise<void> = this.audio.play();
    promise.catch(e => console.log(e));
  }

  public pause(): void {
    if (!this.audio) return;
    this.audio.pause();
  }
}

export { Sound as default };
