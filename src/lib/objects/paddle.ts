import Shape from './shape';
import GameBoard from '../game-board';
import GameSettings from '../game-settings';

class Paddle extends Shape {
  public speed: number;
  public width: number;
  public height: number;
  public color: string;
  public margin: number;
  public x: number;
  public y: number;
  public dx: number;
  public dy: number;

  constructor(gameBoard: GameBoard) {
    super(gameBoard);
    this.speed = GameSettings.PaddleSettings.Speed;
    this.width = GameSettings.PaddleSettings.Width;
    this.height = GameSettings.PaddleSettings.Height;
    this.color = GameSettings.PaddleSettings.Color;
    this.margin = 5;
    this.x = this.canvasWidth - this.margin - this.width;
    this.y = this.margin;
    this.dx = 0;
    this.dy = 0;
    this.draw();
  }

  /**
   * Draws the paddle
   */
  private draw(): void {
    if (!this.ctx) return;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  /**
   * Move the paddle
   */
  public move(): void {
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
