import overWav from '../sounds/coin.wav';
import Sound from './sound';
import GameBoard from './game-board';

const gameOver = new Sound(overWav);

class Shape {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  stopAnimation: boolean;
  gameBoard: GameBoard;

  constructor(gameBoard: GameBoard) {
    this.canvas = gameBoard.ctx.canvas;
    this.ctx = gameBoard.ctx;
    this.stopAnimation = gameBoard.stopAnimation;
    this.gameBoard = gameBoard;
  }

  /**
   * Get the width of the canvas
   * @returns {number} Canvas width in pixels
   */
  get canvasWidth(): number {
    return this.canvas.width;
  }

  /**
   * Get the height of the canvas
   * @returns {number} Canvas height in pixels
   */
  get canvasHeight(): number {
    return this.canvas.height;
  }
}

export { Shape as default };
