import Paddle from './paddle';
import GameBoard from './game-board';

class PlayerPaddle extends Paddle {
  constructor(gameBoard: GameBoard) {
    super(gameBoard);
    document.addEventListener('keydown', this.handleEvent.bind(this));
    document.addEventListener('keyup', this.handleEvent.bind(this));
  }

  private handleEvent(e: KeyboardEvent): void {
    const arrowUp = 38;
    const arrowDown = 40;

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
