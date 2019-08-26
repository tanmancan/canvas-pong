import Shape from '../lib/shape';
import GameBoard from './game-board';

class Paddle extends Shape {
  width: number;
  height: number;
  color: string;
  margin: number;
  x: number;
  y: number;
  speed: number;
  dx: number;
  dy: number;

  constructor(gameBoard: GameBoard) {
    super(gameBoard);
    this.width = 10;
    this.height = 100;
    this.color = 'green';
    this.margin = 5;
    this.x = this.canvasWidth - this.margin - this.width;
    this.y = this.margin;
    this.speed = 10;
    this.dx = 0;
    this.dy = 0;
    this.draw();
  }

  /**
   * Draws the paddle
   */
  draw(): void {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  /**
   * Move the paddle
   */
  move(): void {
    const paddleMinY = this.margin;
    const paddleMaxY = this.canvasHeight - this.margin - this.height;
    const paddleMovementMin = this.y >= paddleMinY;
    const paddleMovementMax = this.y <= paddleMaxY;

    if (paddleMovementMin && paddleMovementMax) {
      this.y += this.dy;
    }

    const paddleTopThreshHold = this.y < paddleMinY;
    const paddleBottomThreshHold = this.y > paddleMaxY;

    if (paddleTopThreshHold) {
      this.y = paddleMinY;
    }

    if (paddleBottomThreshHold) {
      this.y = paddleMaxY;
    }

    this.draw();
  }
}

export { Paddle as default };
