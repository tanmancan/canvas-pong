import GameBoard from './lib/game-board';
import Canvas from './lib/ui/canvas';
import AudioControls from './lib/ui/audio-control';
import GameSettings from './lib/game-settings';

const main = (
  mountId: string,
  audioBounce: string | null = null,
  audioPaddleHit: string | null = null,
  audioGameOverSound: string | null = null,
) => {
  const app = document.getElementById(mountId);

  if (!app) return;

  const canvas = new Canvas();
  const canvasElement = canvas.getElement();

  if (!canvasElement) return;
  app.appendChild(canvasElement);

  const audioControls = new AudioControls();
  const audioControlElement = audioControls.getElement();

  if (audioControlElement) {
    app.appendChild(audioControlElement);
    GameSettings.buildAudioControl('sound');
  }

  const gameBoard: GameBoard = new GameBoard(canvasElement);

  gameBoard.setCustomAudio(audioBounce, audioPaddleHit, audioGameOverSound);

  gameBoard.loop(0);
}

window.playPong = main;
