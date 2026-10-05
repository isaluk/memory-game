import { createElement } from '../utils/create-element.js';

const DEFAULT_PHRASE = 'Не спеши! Ленивцы никогда не торопятся 😴';

export const createMascot = () => {
  const bubble = createElement('p', {
    className: 'mascot__bubble',
    text: DEFAULT_PHRASE,
    attrs: { 'aria-live': 'polite' },
  });

  const element = createElement('div', {
    className: 'mascot',
    children: [
      bubble,
      createElement('img', {
        className: 'mascot__image',
        attrs: { src: 'assets/images/mascot.png', alt: '', width: '256', height: '320' },
      }),
    ],
  });

  const say = (phrase = DEFAULT_PHRASE) => {
    bubble.textContent = phrase;
  };

  return { element, say };
};
