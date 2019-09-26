import DefaultSettings from '../default-settings.json';
import { SettingsModel, GameBoardSettings } from '../types/settings';

class AudioControls {
  private readonly sound: HTMLInputElement;
  private readonly gameBoardSettings: GameBoardSettings;

  constructor(gameBoardSettings: GameBoardSettings) {
    this.gameBoardSettings = gameBoardSettings;
    this.sound = <HTMLInputElement>document.getElementById('sound');

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

  public static setupControl(gameSettings: SettingsModel): AudioControls {
    return new AudioControls(gameSettings.GameBoardSettings);
  }
}

export { AudioControls as default }
