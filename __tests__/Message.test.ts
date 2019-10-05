import Message from '../src/lib/ui/message';
import { createCanvas } from 'canvas';

describe('Message sets attributes correctly', () => {
  let testMessage: Message = null;
  const testMessageLabel = 'My test message.';
  const testMessageOptions = {
    x: 99,
    y: 100,
    height: 20,
    textAlign: <CanvasTextAlign> 'left',
  };
  const canvas = createCanvas(1280, 720);
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

  beforeAll(() => {
    testMessage = new Message(testMessageOptions);
  });

  afterAll(() => {
    testMessage = null;
  });

  it('sets x position on message', () => {
    expect(testMessage.x).toEqual(testMessageOptions.x);
  });

  it('sets y position on message', () => {
    expect(testMessage.y).toEqual(testMessageOptions.y);
  });

  it('sets height on message', () => {
    expect(testMessage.height).toEqual(testMessageOptions.height);
  });

  it('sets textAlign on message', () => {
    expect(testMessage.textAlign).toEqual(testMessageOptions.textAlign);
  });

  it('sets font height in the canvas', () => {
    testMessage.draw(ctx, testMessageLabel);
    expect(ctx.font).toEqual(`700 ${testMessageOptions.height}px monospace`);
  });
});
