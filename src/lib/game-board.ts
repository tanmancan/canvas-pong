import PlayerPaddle from './objects/player-paddle';
import AiPaddle from './objects/ai-paddle';
import Ball from './objects/ball';
import Button from './ui/button';
import Message from './ui/message';
import Sound from './sound';
import { gameOverSound } from './audio/game-audio';
import GameSettings from './game-settings';

class GameBoard {
  static readonly winningScore: number = GameSettings.GameBoardSettings.WinningScore;

  private readonly canvas: HTMLCanvasElement;

  private gameOverSound: Sound;

  public readonly ctx: CanvasRenderingContext2D | null;
  public readonly ball: Ball;
  public readonly playerPaddle: PlayerPaddle;
  public readonly aiPaddle: AiPaddle;
  public readonly message: Message;
  public readonly scoreCard: Message;

  public stopAnimation: boolean;
  public now: number;
  public flashColor: string;
  public aiScore: number;
  public playerScore: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.now = 0;
    this.flashColor = GameSettings.GameBoardSettings.BoardBackground;
    this.aiScore = 0;
    this.playerScore = 0;
    this.stopAnimation = false;
    this.gameOverSound = gameOverSound;
    this.ball = new Ball(this);
    this.playerPaddle = new PlayerPaddle(this);
    this.aiPaddle = new AiPaddle(this);
    this.message = new Message(
      this.canvas.width / 2,
      this.canvas.height / 2,
      48,
    );
    this.scoreCard = new Message(
      this.canvasWidth / 2,
      80,
      48,
    )

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
      ? GameSettings.PaddleSettings.AiPaddleSettings.Name
      : GameSettings.PaddleSettings.PlayerPaddleSettings.Name;
  }

  private get winningThreshold(): boolean {
    return (this.aiScore >= GameBoard.winningScore)
      || (this.playerScore >= GameBoard.winningScore);
  }

  private showMessage(message: string): void {
    if (this.message) this.message.draw(this.ctx, message);
  }

  /**
   * Update the game score. If winner was determined, end the game
   * @returns {void}
   */
  private updateScore(): void {
    if (this.scoreCard) this.scoreCard.draw(this.ctx, `${this.aiScore} | ${this.playerScore}`);
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

    const newGameButton = new Button(
      GameSettings.GameBoardSettings.NewGameButtonSettings.Label,
      this.canvasWidth / 2,
      (this.canvasHeight / 2) + 80,
      GameSettings.GameBoardSettings.NewGameButtonSettings.Height,
      GameSettings.GameBoardSettings.NewGameButtonSettings.LabelColor,
      GameSettings.GameBoardSettings.NewGameButtonSettings.ButtonColor,
    );

    newGameButton.draw(this.ctx);
    this.gameOverSound.play();
    this.stopAnimation = true;
  }

  private newGame(): void {
    this.clear();
    if (this.stopAnimation === true) {
      window.location.reload();
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
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public loop(timestamp: number): void {
    this.ball.move(timestamp);
    this.playerPaddle.move();
    this.aiPaddle.autoMove();

    if (this.stopAnimation) {
      return;
    }

    setTimeout(() => {
      requestAnimationFrame(this.loop.bind(this));
    }, 1000 / 60)
  }

  public setCustomAudio(
    audioBounce: string | null = null,
    audioPaddleHit: string | null = null,
    audioGameOverSound: string | null = null
  ) {
    if (audioGameOverSound) this.gameOverSound = new Sound(audioGameOverSound);
    if (audioBounce) this.ball.setCustomAudioBounce(audioBounce);
    if (audioPaddleHit) this.ball.setCustomAudioPaddleHit(audioPaddleHit);
  }
}

export { GameBoard as default };
