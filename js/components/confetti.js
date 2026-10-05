import { createElement } from '../utils/create-element.js';
import { getRandomItem } from '../utils/random.js';

const PIECES_COUNT = 48;
const SHAPES = ['rect', 'strip', 'circle'];
const COLORS = ['#ffd12f', '#47ff7a', '#ff5b9a', '#b8e4ff', '#e5c8ff', '#ff5b3d', '#f3f0e2'];

const getRandomNumber = (min, max) => min + Math.random() * (max - min);

const createPiece = () => {
  const piece = createElement('span', {
    className: `confetti__piece confetti__piece--${getRandomItem(SHAPES)}`,
  });

  piece.style.setProperty('--x', `${getRandomNumber(0, 100).toFixed(1)}vw`);
  piece.style.setProperty('--drift', `${getRandomNumber(-80, 80).toFixed(0)}px`);
  piece.style.setProperty('--rotate', `${getRandomNumber(-720, 720).toFixed(0)}deg`);
  piece.style.setProperty('--delay', `${getRandomNumber(0.25, 1).toFixed(2)}s`);
  piece.style.setProperty('--duration', `${getRandomNumber(2.4, 4).toFixed(2)}s`);
  piece.style.setProperty('--color', getRandomItem(COLORS));

  return piece;
};

export const createConfetti = () =>
  createElement('div', {
    className: 'confetti',
    attrs: { 'aria-hidden': 'true' },
    children: Array.from({ length: PIECES_COUNT }, createPiece),
  });
