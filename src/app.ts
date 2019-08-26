import GameBoard from './lib/game-board';

const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const gameBoard: GameBoard = new GameBoard(canvas);

// Start game
window.onload = () => {
  canvas.style.opacity = '1';
  gameBoard.loop(null);
};
