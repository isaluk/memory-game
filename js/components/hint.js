import { createElement } from '../utils/create-element.js';

export const createHint = () =>
  createElement('aside', {
    className: 'hint',
    attrs: { 'aria-labelledby': 'hint-title' },
    children: [
      createElement('h2', { className: 'hint__title', text: 'Как играть', attrs: { id: 'hint-title' } }),
      createElement('p', {
        className: 'hint__text',
        text: 'Открой две карточки. Совпали — пара остаётся на поле. Нет — карточки закроются через секунду, запоминай!',
      }),
    ],
  });
