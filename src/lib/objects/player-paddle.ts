import Paddle from './paddle';
import GameBoard from '../game-board';
import GameSettings from '../game-settings';

class PlayerPaddle extends Paddle {
  public readonly color: string;

  constructor(gameBoard: GameBoard) {
    super(gameBoard);
    this.color = GameSettings.PaddleSettings.PlayerPaddleSettings.Color;
    document.addEventListener('keydown', this.handleEvent.bind(this));
    document.addEventListener('keyup', this.handleEvent.bind(this));
  }

  private handleEvent(e: KeyboardEvent): void {
    const arrowUp = 38;
    const arrowDown = 40;

    e.preventDefault();

    switch (e.type) {
      case 'keydown':
        if (e.keyCode === arrowUp) {
          this.dy = -this.speed;
        }
        if (e.keyCode === arrowDown) {
          this.dy = this.speed;
        }
        break;
      case 'keyup':
        this.dy = 0;
        break;
      default:
        break;
    }
  }
}

export { PlayerPaddle as default };
