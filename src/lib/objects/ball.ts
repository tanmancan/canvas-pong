import Shape from './shape';
import GameBoard from '../game-board';
import GameSettings from '../game-settings';
import { bounce, paddleHit } from '../audio/game-audio';
import Sound from '../sound';

class Ball extends Shape {
  protected speed: number;
  protected speedModifier: number;
  protected radius: number;
  protected color: string;
  public x: number;
  public y: number;
  public dx: number;
  public dy: number;

  private bounce: Sound;
  private paddleHit: Sound;

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
    this.bounce = bounce;
    this.paddleHit = paddleHit;

    this.draw();
  }

  /**
   * Draws the game ball
   */
  private draw(): void {
    if (!this.ctx) return;
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
        this.bounce.play();
        this.dy = this.speed;
        break;
      }
      case bottomWallCollision: {
        this.bounce.play();
        this.dy = -this.speed;
        break;
      }
      case leftWallCollision: {
        this.bounce.play();
        this.dx = this.speed;
        this.gameBoard.now = performance.now();
        this.gameBoard.flashColor = GameSettings.GameBoardSettings.OutOfBoundsBackground;
        this.gameBoard.playerScore += 1;
        break;
      }
      case rightWallCollision: {
        this.bounce.play();
        this.dx = -this.speed;
        this.gameBoard.now = performance.now();
        this.gameBoard.flashColor = GameSettings.GameBoardSettings.OutOfBoundsBackground;
        this.gameBoard.aiScore += 1;
        break;
      }
      case playerPaddleCollision: {
        this.paddleHit.play();
        this.gameBoard.now = performance.now();
        this.gameBoard.flashColor = GameSettings.GameBoardSettings.PaddleHitBackground;
        this.speed += this.speedModifier;
        this.dx = -this.speed;
        break;
      }
      case aiPaddleCollision: {
        this.paddleHit.play();
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
    if (timestamp - this.gameBoard.now < 300 && this.ctx) {
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

  public setCustomAudioBounce(
    audioBounce: string,
  ) {
    this.bounce = new Sound(audioBounce);
  }

  public setCustomAudioPaddleHit(
    audioPaddleHit: string,
  ) {
    this.paddleHit = new Sound(audioPaddleHit);
  }
}

export { Ball as default };
