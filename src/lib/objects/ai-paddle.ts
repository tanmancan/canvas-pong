import Paddle from './paddle';
import GameBoard from '../game-board';

class AiPaddle extends Paddle {
  protected readonly xTrackingThreshHold: number;
  // Max delay for AI movement response in milliseconds
  protected readonly handicap: number;
  public gameBoard: GameBoard;

  constructor(gameBoard: GameBoard) {
    super(gameBoard);
    this.gameBoard = gameBoard;
    this.x = this.margin;
    this.y = this.margin;
    this.xTrackingThreshHold = 0.75;
    this.handicap = 500;
  }

  /**
   * Basic AI paddle behavior
   */
  public autoMove(): void {
    const { ball } = this.gameBoard;
    // Randomized delay in milliseconds
    const delay = Math.ceil(Math.random() * this.handicap);

    window.setTimeout(() => {
      const ballMoveLeft = ball.dx < 0;
      const ballMoveRight = ball.dx > 0;
      const ballAbove = ball.y < this.y;
      const ballBelow = ball.y > this.y;
      const aiBottomThreshHold = this.y >= this.canvasHeight * 0.75;
      const aiTopThreshHold = this.y <= this.canvasHeight * 0.25;
      const aiRestThreshHold = (this.y > this.canvasHeight * 0.25)
        && (this.y < this.canvasHeight * 0.75);
      const aiFollowThreshHold = ball.x < this.canvasWidth * this.xTrackingThreshHold;
      const aiNoFollowThreshHold = ball.x >= this.canvasWidth * this.xTrackingThreshHold;

      if (ballMoveLeft && aiFollowThreshHold) {
        if (ballBelow) {
          this.dy = this.speed;
        }

        if (ballAbove) {
          this.dy = -this.speed;
        }
      }

      if (ballMoveRight) {
        if (aiFollowThreshHold && aiBottomThreshHold) {
          this.dy = -this.speed;
        }

        if (aiFollowThreshHold && aiTopThreshHold) {
          this.dy = this.speed;
        }

        if (aiNoFollowThreshHold && aiRestThreshHold) {
          this.dy = 0;
        }
      }
    }, delay);

    this.move();
  }
}

export { AiPaddle as default };
