import { createElement } from '../utils/create-element.js';
import { createCard } from './card.js';

export const createBoard = () => {
  const element = createElement('div', {
    className: 'board',
    attrs: { role: 'group', 'aria-label': 'Игровое поле' },
  });

  const render = (deck) => {
    const cards = deck.map((cardData) => createCard(cardData));
    element.replaceChildren(...cards.map((card) => card.element));

    return cards;
  };

  return { element, render };
};
