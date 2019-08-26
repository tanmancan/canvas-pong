import PlayerPaddle from './player-paddle';
import AiPaddle from './ai-paddle';
import Ball from './ball';
import Button from './button';
import overWav from '../sounds/coin.wav';
import Sound from './sound';

const gameOver = new Sound(overWav);

class GameBoard {
  static readonly winningScore: number = 10;

  private readonly canvas: HTMLCanvasElement;
  public readonly ctx: CanvasRenderingContext2D;
  public readonly ball: Ball;
  public readonly playerPaddle: PlayerPaddle;
  public readonly aiPaddle: AiPaddle;
  public stopAnimation: boolean;
  public now: number;
  public flashColor: string;
  public aiScore: number;
  public playerScore: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.now = 0;
    this.flashColor = 'whitesmoke';
    this.aiScore = 0;
    this.playerScore = 0;
    this.stopAnimation = false;
    this.ball = new Ball(this);
    this.playerPaddle = new PlayerPaddle(this);
    this.aiPaddle = new AiPaddle(this);

    this.canvas.addEventListener('click', () => {
      this.newGame();
    });
  }

  /**
   * Get the width of the canvas
   * @returns {number} Canvas width in pixels
   */
  private get canvasWidth(): number {
    return this.canvas.width;
  }

  /**
   * Get the height of the canvas
   * @returns {number} Canvas height in pixels
   */
  private get canvasHeight(): number {
    return this.canvas.height;
  }

  private get winner(): string {
    return this.aiScore > this.playerScore
      ? 'Computer'
      : 'Player';
  }

  private get winningThreshold(): boolean {
    return (this.aiScore >= GameBoard.winningScore)
      || (this.playerScore >= GameBoard.winningScore);
  }

  private showMessage(message: string): void {
    this.ctx.font = '700 48px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      message,
      this.canvas.width / 2,
      this.canvas.height / 2,
    );
  }

  /**
   * Update the game score. If winner was determined, end the game
   * @returns {void}
   */
  private updateScore(): void {
    this.ctx.font = '700 48px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      `${this.aiScore} | ${this.playerScore}`,
      this.canvasWidth / 2,
      80,
    );
  }

  /**
   * Shows game winning message, and triggers animation to stop
   * @returns {void}
   */
  private gameEnd(): void {
    this.canvas.style.cursor = 'pointer';

    this.clear();
    this.updateScore();
    this.showMessage(`${this.winner} wins!`);

    const newGameButton = new Button({
      text: 'Start New Game',
      x: this.canvasWidth / 2,
      y: (this.canvasHeight / 2) + 80,
      height: 20,
      color: 'white',
      background: 'orange',
    });

    newGameButton.draw(this.ctx);
    gameOver.play();
    this.stopAnimation = true;
  }

  private newGame(): void {
    this.clear();
    if (this.stopAnimation === true) {
      window.location.reload(true);
    }
  }

  public updateBoard(): void {
    this.updateScore();

    if (this.winningThreshold) {
      this.gameEnd();
    }
  }

  /**
   * Clears the canvas
   */
  public clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public loop(timestamp: number): void {
    this.ball.move(timestamp);
    this.playerPaddle.move();
    this.aiPaddle.autoMove();

    if (this.stopAnimation) {
      return;
    }

    requestAnimationFrame(this.loop.bind(this));
  }
}

export { GameBoard as default };
