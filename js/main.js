import { createElement } from './utils/create-element.js';
import { getRandomItem } from './utils/random.js';
import { createHeader } from './components/header.js';
import { createIntro } from './components/intro.js';
import { createPlayground } from './components/playground.js';
import { createScoreboard } from './components/scoreboard.js';
import { createHint } from './components/hint.js';
import { createBoard } from './components/board.js';
import { createMascot } from './components/mascot.js';
import { createFooter } from './components/footer.js';
import { createDeck } from './game/deck.js';
import { createGame } from './game/game.js';
import { CARDS } from './data/cards.js';
import { MATCH_PHRASES, MISMATCH_PHRASES, WIN_PHRASE } from './data/phrases.js';

const initApp = () => {
  let cards = [];

  const header = createHeader();
  const playground = createPlayground();
  const scoreboard = createScoreboard({ totalPairs: CARDS.length });
  const mascot = createMascot();

  const game = createGame({
    onCardChange: (index, state) => cards[index].setState(state),
    onStatsChange: (stats) => scoreboard.update(stats),
    onMatch: () => mascot.say(getRandomItem(MATCH_PHRASES)),
    onMismatch: () => mascot.say(getRandomItem(MISMATCH_PHRASES)),
    onWin: () => mascot.say(WIN_PHRASE),
  });

  const board = createBoard({ onCardClick: (index) => game.flip(index) });

  const startGame = () => {
    const deck = createDeck();
    cards = board.render(deck);
    game.start(deck);
    mascot.say();
  };

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
  startGame();
};

initApp();
