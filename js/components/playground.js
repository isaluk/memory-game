import { createElement } from '../utils/create-element.js';

export const createPlayground = () => {
  const scoreSlot = createElement('div', { className: 'playground__score' });
  const boardSlot = createElement('div', { className: 'playground__board' });
  const mascotSlot = createElement('div', { className: 'playground__mascot' });

  const element = createElement('div', {
    className: 'playground',
    children: [scoreSlot, boardSlot, mascotSlot],
  });

  return { element, scoreSlot, boardSlot, mascotSlot };
};
