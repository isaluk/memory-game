import { createElement } from '../utils/create-element.js';
import { pluralize, formatDate, MOVE_FORMS } from '../utils/format.js';
import { createButton } from './button.js';
import { createIcon } from './icon.js';
import { CARDS } from '../data/cards.js';

export const LEADERBOARD_TITLE_ID = 'leaderboard-title';

const EMPTY_STATE_CARD = CARDS.find((card) => card.id === 'sleepyhead');

const createRow = ({ moves, date }, index) => {
  const place = index + 1;
  const modifier = place <= 3 ? ` leaderboard__row--top-${place}` : '';

  return createElement('tr', {
    className: `leaderboard__row${modifier}`,
    children: [
      createElement('th', {
        className: 'leaderboard__cell leaderboard__cell--place',
        attrs: { scope: 'row' },
        children: [createElement('span', { className: 'leaderboard__place', text: place })],
      }),
      createElement('td', {
        className: 'leaderboard__cell leaderboard__cell--moves',
        text: `${moves} ${pluralize(moves, MOVE_FORMS)}`,
      }),
      createElement('td', {
        className: 'leaderboard__cell leaderboard__cell--date',
        children: [
          createElement('time', {
            text: formatDate(date),
            attrs: { datetime: new Date(date).toISOString() },
          }),
        ],
      }),
    ],
  });
};

const createHeadCell = (text) =>
  createElement('th', { className: 'leaderboard__head-cell', text, attrs: { scope: 'col' } });

const createTable = (results) =>
  createElement('table', {
    className: 'leaderboard__table',
    children: [
      createElement('caption', { className: 'leaderboard__caption', text: 'Лучшие результаты' }),
      createElement('thead', {
        children: [
          createElement('tr', {
            children: [createHeadCell('№'), createHeadCell('Ходы'), createHeadCell('Дата')],
          }),
        ],
      }),
      createElement('tbody', { children: results.map(createRow) }),
    ],
  });

const createEmptyState = (totalPairs) =>
  createElement('div', {
    className: 'leaderboard__empty',
    children: [
      createElement('div', {
        className: 'leaderboard__avatar',
        children: [
          createElement('img', {
            className: 'leaderboard__avatar-image',
            attrs: { src: EMPTY_STATE_CARD.image, alt: '', width: '132', height: '132' },
          }),
        ],
      }),
      createElement('p', { className: 'leaderboard__empty-title', text: 'Пока нет результатов' }),
      createElement('p', {
        className: 'leaderboard__empty-text',
        text: `Найди все ${totalPairs} пар — и твой результат первым появится в этой таблице.`,
      }),
    ],
  });

export const createLeaderboard = ({ results, totalPairs, onClose }) => {
  const closeButton = createButton({ label: 'Закрыть', variant: 'outline' });
  closeButton.addEventListener('click', onClose);

  const hasResults = results.length > 0;

  return createElement('div', {
    className: 'leaderboard',
    children: [
      createElement('div', {
        className: 'leaderboard__header',
        children: [
          createIcon('trophy', 'leaderboard__icon'),
          createElement('h2', {
            className: 'leaderboard__title',
            text: 'Таблица лидеров',
            attrs: { id: LEADERBOARD_TITLE_ID },
          }),
        ],
      }),
      hasResults &&
        createElement('p', {
          className: 'leaderboard__subtitle',
          text: 'Топ-10 игр: чем меньше ходов, тем выше место',
        }),
      hasResults ? createTable(results) : createEmptyState(totalPairs),
      createElement('div', { className: 'leaderboard__footer', children: [closeButton] }),
    ],
  });
};
