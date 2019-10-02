import GameSettings from '../src/lib/game-settings';
import defaultSettings from '../src/lib/default-settings.json';

it('loads GameSettings with default settingss', () => {
  expect(GameSettings.BallSettings).toMatchObject(defaultSettings.BallSettings);
  expect(GameSettings.PaddleSettings).toMatchObject(defaultSettings.PaddleSettings);
  expect(GameSettings.GameBoardSettings).toMatchObject(defaultSettings.GameBoardSettings);
});

it('Fails test and notifies on Github actions', () => {
  expect(3).toEqual(5);
});
