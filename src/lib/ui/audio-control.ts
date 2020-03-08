export class AudioControl {
  private element: HTMLParagraphElement = null;

  constructor() {
    if (typeof document === 'undefined') return;
    this.element = document.createElement('p');
    this.element.innerHTML = `
      <input type="checkbox" name="sound" id="sound">
      <label for="sound"><strong>Mute Audio</strong></label>
    `;
  }

  getElement(): HTMLParagraphElement {
    return this.element;
  }
}

export default AudioControl;
