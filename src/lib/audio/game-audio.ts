import Sound from '../sound';
import bounceWav from '../../sounds/blip.wav';
import paddleWav from '../../sounds/pop.wav';
import overWav from '../../sounds/coin.wav';

export const bounce = new Sound(bounceWav);
export const paddleHit = new Sound(paddleWav);
export const gameOverSound = new Sound(overWav);
