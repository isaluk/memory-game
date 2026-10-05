import { createElement } from './utils/create-element.js';
import { createHeader } from './components/header.js';
import { createIntro } from './components/intro.js';
import { createPlayground } from './components/playground.js';
import { createBoard } from './components/board.js';
import { createFooter } from './components/footer.js';
import { createDeck } from './game/deck.js';

const initApp = () => {
  const header = createHeader();
  const playground = createPlayground();
  const board = createBoard();

  board.render(createDeck());
  playground.boardSlot.append(board.element);

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
