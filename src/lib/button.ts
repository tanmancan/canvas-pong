class Button {
  text: string;
  x: number;
  y: number;
  height: number;
  color: string;
  background: string;

  constructor(options: Partial<Button>) {
    Object.assign(this, options);
  }

  get font(): string {
    return `700 ${this.height}px monospace`;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    this.drawBackground(ctx);
    this.drawForeground(ctx);
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    const textMeasure: TextMetrics = ctx.measureText(this.text);
    const buttonWidth: number = textMeasure.width + 40;
    const buttonHeight: number = this.height * 2;
    const buttonX: number = this.x - (buttonWidth / 2);
    const buttonY: number = this.y - (this.height * 1.25);

    ctx.fillStyle = this.background;
    ctx.fillRect(
      buttonX,
      buttonY,
      buttonWidth,
      buttonHeight,
    );
  }

  drawForeground(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillText(
      this.text,
      this.x,
      this.y,
    );
  }
}

export { Button as default };
