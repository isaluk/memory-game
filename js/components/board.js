import { createElement } from '../utils/create-element.js';
import { createCard } from './card.js';

export const createBoard = ({ onCardClick }) => {
  const element = createElement('div', {
    className: 'board',
    attrs: { role: 'group', 'aria-label': 'Игровое поле' },
  });

  element.addEventListener('click', (event) => {
    const cardElement = event.target.closest('.card');

    if (cardElement) {
      onCardClick(Number(cardElement.dataset.index));
    }
  });

  const render = (deck) => {
    const cards = deck.map((cardData, index) => {
      const card = createCard(cardData);
      card.element.dataset.index = index;

      return card;
    });

    element.replaceChildren(...cards.map((card) => card.element));

    return cards;
  };

  return { element, render };
};
