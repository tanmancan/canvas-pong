import Sound from '../src/lib/sound';

jest.mock('../src/lib/sound.ts');

const testAudioSrc = '../src/sounds/blip.wav';

describe('Sound', () => {
  let blipSound: Sound = null;

  beforeEach(() => {
    blipSound = new Sound(testAudioSrc);
  });

  afterEach(() => {
    blipSound = null;
  });

  it('plays audio', () => {
    blipSound.play();
    expect(blipSound.play).toHaveBeenCalledTimes(1);
  });

  it('pauses audio', () => {
    blipSound.pause();
    expect(blipSound.pause).toHaveBeenCalledTimes(1);
  });
});
