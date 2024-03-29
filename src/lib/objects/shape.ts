import GameBoard from '../game-board';

class Shape {
  protected readonly ctx: CanvasRenderingContext2D | null;
  protected readonly canvas?: HTMLCanvasElement;
  protected readonly stopAnimation: boolean;
  protected readonly gameBoard: GameBoard;

  constructor(gameBoard: GameBoard) {
    this.canvas = gameBoard.ctx?.canvas;
    this.ctx = gameBoard.ctx;
    this.stopAnimation = gameBoard.stopAnimation;
    this.gameBoard = gameBoard;
  }

  /**
   * Get the width of the canvas
   * @returns {number} Canvas width in pixels
   */
  protected get canvasWidth(): number {
    return this.canvas?.width ?? 0;
  }

  /**
   * Get the height of the canvas
   * @returns {number} Canvas height in pixels
   */
  protected get canvasHeight(): number {
    return this.canvas?.height ?? 0;
  }
}

export { Shape as default };
