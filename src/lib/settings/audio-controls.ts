import DefaultSettings from '../default-settings.json';
import { SettingsModel, GameBoardSettings } from '../types/settings';

class AudioControls {
  private readonly sound: HTMLInputElement;
  private readonly gameBoardSettings: GameBoardSettings;

  constructor(gameSettings: SettingsModel, controlId: string = 'sound') {
    if (typeof document === 'undefined') return;
    this.gameBoardSettings = gameSettings.GameBoardSettings;
    this.sound = document.getElementById(controlId) as HTMLInputElement;

    if (this.sound) {
      this.sound.checked = DefaultSettings.GameBoardSettings.MuteAudio;
      this.sound.addEventListener('change', this.setAudioOption.bind(this));
    }
  }

  get mute(): boolean {
    return this.gameBoardSettings.MuteAudio;
  }

  set mute(value: boolean) {
    Object.assign(this.gameBoardSettings, {
      MuteAudio: value,
    });
  }

  setAudioOption(e: { target: HTMLInputElement }): void {
    this.mute = e.target.checked;
  }
}

export { AudioControls as default }
