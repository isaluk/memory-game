import { createElement } from '../utils/create-element.js';
import { START_PHRASE } from '../data/phrases.js';

export const createMascot = () => {
  const bubble = createElement('p', {
    className: 'mascot__bubble',
    text: START_PHRASE,
    attrs: { 'aria-live': 'polite' },
  });

  const element = createElement('div', {
    className: 'mascot',
    children: [
      bubble,
      createElement('img', {
        className: 'mascot__image',
        attrs: {
          src: 'assets/images/mascot.png',
          alt: '',
          width: '256',
          height: '320',
          draggable: 'false',
        },
      }),
    ],
  });

  const say = (phrase = START_PHRASE) => {
    bubble.textContent = phrase;
  };

  return { element, say };
};
