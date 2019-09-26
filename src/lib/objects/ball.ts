import Shape from './shape';
import GameBoard from '../game-board';
import Sound from '../sound';
import bounceWav from '../../sounds/blip.wav';
import paddleWav from '../../sounds/pop.wav';
import GameSettings from '../game-settings';

const bounce = new Sound(bounceWav);
const paddleHit = new Sound(paddleWav);

class Ball extends Shape {
  protected speed: number;
  protected speedModifier: number;
  protected radius: number;
  protected color: string;
  public x: number;
  public y: number;
  public dx: number;
  public dy: number;

  constructor(
    gameBoard: GameBoard,
  ) {
    super(gameBoard);
    this.speed = GameSettings.BallSettings.Speed;
    this.speedModifier = GameSettings.BallSettings.SpeedModifier;
    this.radius = GameSettings.BallSettings.Radius;
    this.color = GameSettings.BallSettings.Color;
    this.x = this.radius;
    this.y = this.radius;
    this.dx = this.speed;
    this.dy = this.speed;

    this.draw();
  }

  /**
   * Draws the game ball
   */
  private draw(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
    this.gameBoard.updateBoard();
  }

  /**
   * Detects ball collision with walls and paddles
   * @param  {number} timestamp DOMHighResTimeStamp passed from requestAnimationFrame
   */
  private collision(timestamp: number): void {
    const {
      playerPaddle,
      aiPaddle,
    } = this.gameBoard;

    const leftWallCollision = this.x < this.radius;
    const topWallCollision = this.y < this.radius;
    const rightWallCollision = this.x > this.canvasWidth - this.radius;
    const bottomWallCollision = this.y > this.canvasHeight - this.radius;

    const playerPaddleCollision =
      (this.x >= this.canvasWidth - playerPaddle.margin - playerPaddle.width - this.radius)
      && (this.dx > 0)
      && (this.y >= playerPaddle.y)
      && (this.y <= playerPaddle.y + playerPaddle.height);

    const aiPaddleCollision =
      (this.x <= aiPaddle.margin + aiPaddle.width + this.radius)
      && (this.dx < 0)
      && (this.y >= aiPaddle.y)
      && (this.y <= aiPaddle.y + aiPaddle.height);

    switch (true) {
      case topWallCollision: {
        bounce.play();
        this.dy = this.speed;
        break;
      }
      case bottomWallCollision: {
        bounce.play();
        this.dy = -this.speed;
        break;
      }
      case leftWallCollision: {
        bounce.play();
        this.dx = this.speed;
        this.gameBoard.now = performance.now();
        this.gameBoard.flashColor = GameSettings.GameBoardSettings.OutOfBoundsBackground;
        this.gameBoard.playerScore += 1;
        break;
      }
      case rightWallCollision: {
        bounce.play();
        this.dx = -this.speed;
        this.gameBoard.now = performance.now();
        this.gameBoard.flashColor = GameSettings.GameBoardSettings.OutOfBoundsBackground;
        this.gameBoard.aiScore += 1;
        break;
      }
      case playerPaddleCollision: {
        paddleHit.play();
        this.gameBoard.now = performance.now();
        this.gameBoard.flashColor = GameSettings.GameBoardSettings.PaddleHitBackground;
        this.speed += this.speedModifier;
        this.dx = -this.speed;
        break;
      }
      case aiPaddleCollision: {
        paddleHit.play();
        this.gameBoard.now = performance.now();
        this.gameBoard.flashColor = GameSettings.GameBoardSettings.PaddleHitBackground;
        this.speed += this.speedModifier;
        this.dx = this.speed;
        break;
      }
      default: {
        break;
      }
    }

    // Flash colors on the canvas based on if ball was out of bounds or hit by the paddle
    if (timestamp - this.gameBoard.now < 300) {
      this.ctx.fillStyle = this.gameBoard.flashColor;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
  }

  /**
   * Animates the ball
   * @param  {number} timestamp DOMHighResTimeStamp passed to the requestAnimationFrame callback
   */
  public move(timestamp: number): void {
    this.gameBoard.clear();

    this.collision(timestamp);
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

export { Ball as default };
