import DefaultSettings from '../default-settings.json';
import { SettingsModel, GameBoardSettings } from '../types/settings';

class AudioControls {
  private readonly sound: HTMLInputElement;
  private readonly gameBoardSettings: GameBoardSettings;

  constructor(gameSettings: SettingsModel, controlId: string = 'sound') {
    this.gameBoardSettings = gameSettings.GameBoardSettings;
    this.sound = <HTMLInputElement>document.getElementById(controlId);

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
