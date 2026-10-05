import { createElement } from './utils/create-element.js';
import { createHeader } from './components/header.js';
import { createIntro } from './components/intro.js';
import { createPlayground } from './components/playground.js';
import { createScoreboard } from './components/scoreboard.js';
import { createHint } from './components/hint.js';
import { createBoard } from './components/board.js';
import { createMascot } from './components/mascot.js';
import { createFooter } from './components/footer.js';
import { createDeck } from './game/deck.js';
import { CARDS } from './data/cards.js';

const initApp = () => {
  const header = createHeader();
  const playground = createPlayground();
  const scoreboard = createScoreboard({ totalPairs: CARDS.length });
  const board = createBoard();
  const mascot = createMascot();

  board.render(createDeck());

  playground.scoreSlot.append(scoreboard.element, createHint());
  playground.boardSlot.append(board.element);
  playground.mascotSlot.append(mascot.element);

  const main = createElement('main', {
    className: 'page__main',
    children: [createIntro(), playground.element],
  });

  const page = createElement('div', {
    className: 'page',
    children: [header.element, main, createFooter()],
  });

  document.body.append(page);
};

initApp();
