class Button {
  public readonly text: string;
  public readonly x: number;
  public readonly y: number;
  public readonly height: number;
  public readonly color: string;
  public readonly background: string;

  constructor(options: Partial<Button>) {
    Object.assign(this, options);
  }

  protected get font(): string {
    return `700 ${this.height}px monospace`;
  }

  private drawBackground(ctx: CanvasRenderingContext2D) {
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

  private drawForeground(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillText(
      this.text,
      this.x,
      this.y,
    );
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    this.drawBackground(ctx);
    this.drawForeground(ctx);
  }
}

export { Button as default };
