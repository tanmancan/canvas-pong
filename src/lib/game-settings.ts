import DefaultSettings from './default-settings.json';
import {
  SettingsModel,
  BallSettings,
  PaddleSettings,
  GameBoardSettings,
} from './types/settings';
import AudioControls from './settings/audio-controls';

class GameSettings implements SettingsModel {
  readonly BallSettings: BallSettings;
  readonly PaddleSettings: PaddleSettings;
  readonly GameBoardSettings: GameBoardSettings;

  constructor(
    defaultOptions: SettingsModel,
    customOptions?: Partial<SettingsModel>
  ) {
    Object.assign(this, defaultOptions, customOptions);
  }

  buildAudioControl(controlId: string) {
    new AudioControls(this, controlId);
  }
}

const gameSettings = new GameSettings(DefaultSettings);

export { gameSettings as default }
