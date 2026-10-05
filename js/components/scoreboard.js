import { createElement } from '../utils/create-element.js';

const createStat = (label, value) =>
  createElement('div', {
    className: 'scoreboard__stat',
    children: [createElement('dt', { className: 'scoreboard__label', text: label }), value],
  });

export const createScoreboard = ({ totalPairs }) => {
  const movesValue = createElement('dd', { className: 'scoreboard__value', text: '0' });
  const pairsValue = createElement('dd', {
    className: 'scoreboard__value',
    text: `0/${totalPairs}`,
    attrs: { 'aria-live': 'polite' },
  });

  const element = createElement('dl', {
    className: 'scoreboard',
    children: [createStat('Ходы', movesValue), createStat('Найдено пар', pairsValue)],
  });

  const update = ({ moves, pairs }) => {
    movesValue.textContent = moves;
    pairsValue.textContent = `${pairs}/${totalPairs}`;
  };

  return { element, update };
};
