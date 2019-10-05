import GameSettings from '../src/lib/game-settings';
import defaultSettings from '../src/lib/default-settings.json';

describe('GameSettings', () => {
  it('loads GameSettings with default settingss', () => {
    expect(GameSettings.BallSettings).toMatchObject(defaultSettings.BallSettings);
    expect(GameSettings.PaddleSettings).toMatchObject(defaultSettings.PaddleSettings);
    expect(GameSettings.GameBoardSettings).toMatchObject(defaultSettings.GameBoardSettings);
  });
});
