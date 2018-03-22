import Sound from './audio';
import pongWav from './sounds/blip.wav';
import coinWav from './sounds/coin.wav';
import thudWav from './sounds/pop.wav';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const raf = window.requestAnimationFrame;
let stopAnimation = false;

const pong = new Sound(pongWav);
const coin = new Sound(coinWav);
const thud = new Sound(thudWav);

let ball = null;
let paddle = null;
let aiPaddle = null;

/**
 * Shape Class
 */
class Shape {
  constructor(context) {
    this.ctx = context;
    this.canvas = ctx.canvas;
    this.now = 0;
    this.flashColor = 'whitesmoke';
    [this.aiScore, this.playerScore] = [0, 0];
    this.winningScore = 10;

    this.canvas.addEventListener('click', () => {
      this.newGame();
    });
  }

  /**
   * Get the width of the canvas
   * @return {int} Canvas width in pixels
   */
  get canvasWidth() {
    return this.canvas.width;
  }

  /**
   * Get the height of the canvas
   * @return {int} Canvas height in pixels
   */
  get canvasHeight() {
    return this.canvas.height;
  }

  /**
   * Update the game score. If winner was determined, end the game
   */
  updateScore() {
    this.ctx.font = '700 48px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`${this.aiScore} | ${this.playerScore}`, this.canvasWidth / 2, 80);

    if (this.aiScore >= this.winningScore || this.playerScore >= this.winningScore) {
      this.gameEnd();
    }
  }

  /**
   * Shows game winning message, and triggers animaion to stop
   */
  gameEnd() {
    this.clear();

    this.canvas.style.cursor = 'pointer';

    const winner = this.aiScore > this.playerScore
      ? 'Computer'
      : 'Player';

    const scoreTxt = `${this.aiScore} | ${this.playerScore}`;
    const posScoreX = this.canvasWidth / 2;
    const posScoreY = 80;

    const msgTxt = `${winner} wins!`;
    const posMessageX = posScoreX;
    const posMessageY = this.canvasHeight / 2;

    this.ctx.font = '700 48px monospace';
    this.ctx.textAlign = 'center';

    this.ctx.fillText(scoreTxt, posScoreX, posScoreY);
    this.ctx.fillText(msgTxt, posMessageX, posMessageY);

    const newGameTxt = 'Start New Game';
    const newGameTextHeight = 20;
    const posNewGameTextX = posScoreX;
    const posNewGameTextY = posMessageY + 80;

    this.ctx.font = `700 ${newGameTextHeight}px monospace`;
    const newGameTextMeasure = this.ctx.measureText(newGameTxt);

    const newGameButtonWidth = newGameTextMeasure.width + 40;
    const newGameButtonHeight = newGameTextHeight * 2;
    const newGameButtonPosX = posNewGameTextX - (newGameButtonWidth / 2);
    const newGameButtonPosY = posNewGameTextY - (newGameTextHeight * 1.25);

    this.ctx.fillStyle = 'orange';
    this.ctx.fillRect(
      newGameButtonPosX, newGameButtonPosY,
      newGameButtonWidth, newGameButtonHeight,
    );

    this.ctx.fillStyle = 'white';
    this.ctx.fillText(newGameTxt, posNewGameTextX, posNewGameTextY);

    coin.play();
    stopAnimation = true;
  }

  newGame() {
    this.clear();
    if (stopAnimation === true) {
      window.location.reload(true);
    }
  }

  /**
   * Clears the canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/**
 * Ball Class
 */
class Ball extends Shape {
  constructor(context, radius) {
    super(context);
    this.defaultRadius = 10;
    this.color = 'green';
    this.radius = radius || this.defaultRadius;
    this.x = radius || this.defaultRadius;
    this.y = radius || this.defaultRadius;
    this.speed = 10;
    this.dx = this.speed;
    this.dy = this.speed;

    this.draw();
  }

  /**
   * Draws the game ball
   */
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
    this.updateScore();
  }

  /**
   * Animates the ball
   * @param  {double} timestamp DOMHighResTimeStamp passed to the requestAnimationFrame callback
   */
  move(timestamp) {
    this.clear();
    this.collision(timestamp);
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }

  /**
   * Detects ball collision with walls and paddles
   * @param  {double} timestamp DOMHighResTimeStamp passed from requestAnimationFrame
   */
  collision(timestamp) {
    // Wall left
    if (this.x < this.radius) {
      pong.play();
      this.dx = this.speed;
    }

    // Wall top
    if (this.y < this.radius) {
      pong.play();
      this.dy = this.speed;
    }

    // Wall right
    if (this.x > this.canvasWidth - this.radius) {
      pong.play();
      this.dx = -this.speed;
    }

    // Wall bottom
    if (this.y > this.canvasHeight - this.radius) {
      pong.play();
      this.dy = -this.speed;
    }

    // Ai score if ball hits right wall
    if (this.x > this.canvasWidth - this.radius) {
      this.now = performance.now();
      this.flashColor = 'red';
      this.score[0] += 1;
    }

    // Player scores if ball hits left wall
    if (this.x < this.radius) {
      this.now = performance.now();
      this.flashColor = 'red';
      this.score[1] += 1;
    }

    // If paddle hits ball back
    const playerPaddleCollide =
    this.x >= this.canvasWidth - paddle.margin - paddle.width - this.radius
      && this.dx > 0
      && this.y >= paddle.y
      && this.y <= paddle.y + paddle.height;

    if (playerPaddleCollide) {
      thud.play();
      this.now = performance.now();
      this.flashColor = 'pink';
      this.speed += 0;
      this.dx = -this.speed;
    }

    // If AI paddle hits ball back
    const aiPaddleCollide =
    this.x <= aiPaddle.margin + aiPaddle.width + this.radius
      && this.dx < 0
      && this.y >= aiPaddle.y
      && this.y <= aiPaddle.y + aiPaddle.height;

    if (aiPaddleCollide) {
      thud.play();
      this.now = performance.now();
      this.flashColor = 'pink';
      this.speed += 0;
      this.dx = this.speed;
    }

    // Flash colors on the canvas based on if ball was out of bounds or hit by the paddle
    if (timestamp - this.now < 300) {
      this.ctx.fillStyle = this.flashColor;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
  }
}

/**
 * Paddle Class
 */
class Paddle extends Shape {
  constructor(context) {
    super(context);
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
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  /**
   * Move the paddle
   */
  move() {
    if (this.y >= this.margin && this.y <= this.canvasHeight - this.margin - this.height) {
      this.y += this.dy;
    }

    if (this.y < this.margin) {
      this.y = this.margin;
    }

    if (this.y > this.canvasHeight - this.margin - this.height) {
      this.y = this.canvasHeight - this.margin - this.height;
    }
    this.draw();
  }
}

/**
 * AI Paddle
 */
class AiPaddle extends Paddle {
  constructor(context) {
    super(context);
    this.x = this.margin;
    this.y = this.margin;
    this.xTrackingThreshHold = 0.75;
    // Max delay for AI movement response in milliseconds
    this.handicap = 500;
  }

  /**
   * Basic AI paddle behavior
   */
  autoMove() {
    // Randomized delay in milliseconds
    const delay = Math.ceil(Math.random() * this.handicap);

    // Set a slight delay to make AI less then perfect
    window.setTimeout(() => {
      // If ball is moving towards the AI paddle
      if (ball.dx < 0) {
        if (ball.y > this.y && ball.x < this.canvasWidth * this.xTrackingThreshHold) {
          this.dy = this.speed;
        }

        if (ball.y < this.y && ball.x < this.canvasWidth * this.xTrackingThreshHold) {
          this.dy = -this.speed;
        }
      }

      // If ball is moving away from AI paddle
      if (ball.dx > 0) {
        if (ball.x < this.canvasWidth * this.xTrackingThreshHold
          && this.y >= this.canvasHeight * 0.75) {
          this.dy = -this.speed;
        }

        if (ball.x < this.canvasWidth * this.xTrackingThreshHold
          && this.y <= this.canvasHeight * 0.25) {
          this.dy = this.speed;
        }

        if (ball.x >= this.canvasWidth * this.xTrackingThreshHold
          && this.y > this.canvasHeight * 0.25 && this.y < this.canvasHeight * 0.75) {
          this.dy = 0;
        }
      }
    }, delay);

    this.move();
  }
}

paddle = new Paddle(ctx);
aiPaddle = new AiPaddle(ctx);
ball = new Ball(ctx, 20);

/**
 * Keyboard event handler
 * @param  {object} e Event
 * @return {undefined}
 */
const handleEvent = (e) => {
  const arrowUp = 38;
  const arrowDown = 40;

  switch (e.type) {
    case 'keydown':
      if (e.keyCode === arrowUp) {
        paddle.dy = -paddle.speed;
      }
      if (e.keyCode === arrowDown) {
        paddle.dy = paddle.speed;
      }
      break;
    case 'keyup':
      paddle.dy = 0;
      break;
    default:
      break;
  }
};

document.addEventListener('keydown', handleEvent);
document.addEventListener('keyup', handleEvent);

/**
 * Animation loop
 * @param  {double} timestamp DOMHighResTimeStamp passed by requestAnimationFrame
 */
const loop = (timestamp) => {
  ball.move(timestamp);
  paddle.move(timestamp);
  aiPaddle.autoMove(timestamp);

  if (stopAnimation) {
    return;
  }
  raf(loop);
};

// Start game
loop();
