class Message {
  /**
   * X-axis point in pixels where to draw the text.
   *
   * @type {number}
   */
  readonly x: number;
  /**
   * Y-axis point in pixels where to draw the text.
   *
   * @type {number}
   */
  readonly y: number;
  /**
   * Height of the text in pixels
   *
   * @type {number}
   */
  readonly height: number;
  /**
   * Alignment of the text in relationship to the x value.
   *
   * @type {CanvasTextAlign}
   */
  readonly textAlign?: CanvasTextAlign = 'center';

  constructor(options: Partial<Message>) {
    Object.assign(this, options);
  }

  /**
   * Sets font styles for the canvas.
   *
   * @readonly
   * @protected
   * @type {string}
   */
  protected get font(): string {
    return `700 ${this.height}px monospace`;
  }


  /**
   * Draws the ui text on provided canvas drawing surface
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} text
   */
  public draw(ctx: CanvasRenderingContext2D, text: string): void {
    ctx.font = this.font;
    ctx.textAlign = this.textAlign;
    ctx.fillText(
      text,
      this.x,
      this.y,
    );
  }
}

export { Message as default };
