import { createElement } from '../utils/create-element.js';
import { pluralize, MOVE_FORMS } from '../utils/format.js';
import { createButton } from './button.js';
import { createConfetti } from './confetti.js';

export const VICTORY_TITLE_ID = 'victory-title';

const getPlaceNote = (place) =>
  place
    ? `Результат сохранён: ${place}-е место в таблице лидеров`
    : 'В таблицу лидеров попадают 10 лучших игр — в следующий раз получится!';

export const createVictory = ({ moves, place, totalPairs, onNewGame, onClose }) => {
  const newGameButton = createButton({ label: 'Новая игра', variant: 'primary', icon: 'restart' });
  const closeButton = createButton({ label: 'Закрыть', variant: 'outline' });

  newGameButton.setAttribute('autofocus', '');
  newGameButton.addEventListener('click', onNewGame);
  closeButton.addEventListener('click', onClose);

  return createElement('div', {
    className: 'victory',
    children: [
      createElement('div', {
        className: 'victory__avatar',
        children: [
          createElement('img', {
            className: 'victory__avatar-image',
            attrs: { src: 'assets/images/avatar-champion.png', alt: '', width: '150', height: '150' },
          }),
        ],
      }),
      createElement('h2', { className: 'victory__title', text: 'Победа!', attrs: { id: VICTORY_TITLE_ID } }),
      createElement('p', {
        className: 'victory__text',
        text: `Все ${totalPairs} пар найдены. Даже ленивец впечатлён твоей скоростью!`,
      }),
      createElement('p', {
        className: 'victory__result',
        children: [
          createElement('span', { className: 'victory__moves', text: moves }),
          createElement('span', {
            className: 'victory__moves-label',
            text: `${pluralize(moves, MOVE_FORMS)} за игру`,
          }),
        ],
      }),
      createElement('p', { className: 'victory__note', text: getPlaceNote(place) }),
      createElement('div', {
        className: 'victory__actions',
        children: [newGameButton, closeButton],
      }),
      createConfetti(),
    ],
  });
};
