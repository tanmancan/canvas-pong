import GameBoard from './lib/game-board';
import Canvas from './lib/ui/canvas';
import AudioConrols from './lib/ui/audio-control';
import GameSettings from './lib/game-settings';

const main = (
  mountId: string,
  audioBounce: string = null,
  audioPaddleHit: string = null,
  audioGameOverSound: string = null,
) => {
  const app = document.getElementById(mountId);

  if (!app) return;

  const canvas = new Canvas();
  const canvasElement = canvas.getElement();
  app.appendChild(canvasElement);

  const audioControls = new AudioConrols();
  const audioControlElement = audioControls.getElement();
  app.appendChild(audioControlElement);
  GameSettings.buildAudioControl('sound');

  const gameBoard: GameBoard = new GameBoard(canvasElement);

  gameBoard.setCustomAudio(audioBounce, audioPaddleHit, audioGameOverSound);

  gameBoard.loop(null);
}

window.playPong = main;
