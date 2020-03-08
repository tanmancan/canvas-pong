interface CanvasStyleInterface {
  width: string;
  height: string;
  background: string;
  position: string;
  zIndex: string;
}

export class Canvas {
  private element: HTMLCanvasElement = null;
  private width: number = 1280;
  private height: number = 720;
  private styles: CanvasStyleInterface = {
    width: '100%',
    height: 'auto',
    background: 'whitesmoke',
    position: 'relative',
    zIndex: '1',
  }

  constructor() {
    if (typeof document === 'undefined') return;
    this.element = document.createElement('canvas');
    this.element.width = this.width;
    this.element.height = this.height;
    this.element.style.width
    this.addStyles();
  }

  private addStyles() {
    Object.entries(this.styles).forEach((style: [any, string]) => {
      const [key, value] = style;
      this.element.style[key] = value;
    })
  }

  getElement(): HTMLCanvasElement {
    return this.element;
  }
}

export default Canvas;
