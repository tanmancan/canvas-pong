import Button from '../src/lib/ui/button';
import { createCanvas } from 'canvas';

describe('Button sets attributes correctly', () => {
  let testButton: Button = null;
  const testButtonOptions = {
    text: 'My test button.',
    x: 99,
    y: 100,
    height: 20,
    color: 'pink',
    background: 'red',
  };
  const canvas = createCanvas(1280, 720);
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

  beforeAll(() => {
    testButton = new Button(testButtonOptions);
  });

  afterAll(() => {
    testButton = null;
  });

  it('sets text on button', () => {
    expect(testButton.text).toEqual(testButtonOptions.text);
    expect(5).toEqual(4);
  });

  it('sets x position on button', () => {
    expect(testButton.x).toEqual(testButtonOptions.x);
  });

  it('sets y position on button', () => {
    expect(testButton.y).toEqual(testButtonOptions.y);
  });

  it('sets height on button', () => {
    expect(testButton.height).toEqual(testButtonOptions.height);
  });

  it('sets color on button', () => {
    expect(testButton.color).toEqual(testButtonOptions.color);
  });

  it('sets background on button', () => {
    expect(testButton.background).toEqual(testButtonOptions.background);
  });

  it('sets font height in the canvas', () => {
    testButton.draw(ctx);
    expect(ctx.font).toEqual(`700 ${testButtonOptions.height}px monospace`);
  });
});
