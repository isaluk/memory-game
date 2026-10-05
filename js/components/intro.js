import { createElement } from '../utils/create-element.js';

export const createIntro = () =>
  createElement('section', {
    className: 'intro',
    children: [
      createElement('h1', { className: 'intro__title', text: 'Найди пары' }),
      createElement('p', {
        className: 'intro__text',
        text: 'Открывай карточки и собирай пары ленивцев за наименьшее число ходов',
      }),
    ],
  });
