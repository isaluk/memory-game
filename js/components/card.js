import { createElement } from '../utils/create-element.js';

const STATES = ['open', 'matched', 'mismatch'];

const getLabel = (state, title) => {
  const labels = {
    closed: 'Закрытая карточка',
    open: `Открытая карточка: ${title}`,
    mismatch: `Не совпало: ${title}`,
    matched: `Пара найдена: ${title}`,
  };

  return labels[state];
};

export const createCard = ({ id, title, image }) => {
  const element = createElement('button', {
    className: 'card',
    attrs: { type: 'button', 'aria-label': getLabel('closed', title) },
    children: [
      createElement('span', {
        className: 'card__inner',
        children: [
          createElement('span', { className: 'card__side card__side--back' }),
          createElement('span', {
            className: `card__side card__side--front card__side--${id}`,
            children: [
              createElement('img', {
                className: 'card__image',
                attrs: { src: image, alt: '', width: '300', height: '300', draggable: 'false' },
              }),
            ],
          }),
        ],
      }),
      createElement('span', { className: 'card__badge' }),
    ],
  });

  const setState = (state) => {
    element.classList.remove(...STATES.map((name) => `card--${name}`));

    if (STATES.includes(state)) {
      element.classList.add(`card--${state}`);
    }

    element.setAttribute('aria-label', getLabel(state, title));

    if (state === 'matched') {
      element.setAttribute('aria-disabled', 'true');
    } else {
      element.removeAttribute('aria-disabled');
    }
  };

  return { element, setState };
};
