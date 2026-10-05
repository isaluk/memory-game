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
import { createModal } from './components/modal.js';
import { createVictory, VICTORY_TITLE_ID } from './components/victory.js';
import { createLeaderboard, LEADERBOARD_TITLE_ID } from './components/leaderboard.js';
import { createDeck } from './game/deck.js';
import { createGame } from './game/game.js';
import { addResult, getResults } from './services/leaderboard-storage.js';
import { createSound } from './services/sound.js';
import { CARDS } from './data/cards.js';
import { MATCH_PHRASES, MISMATCH_PHRASES, WIN_PHRASE } from './data/phrases.js';

const VICTORY_DELAY = 700;

const initApp = () => {
  let cards = [];
  let victoryTimer = null;

  const header = createHeader();
  const playground = createPlayground();
  const scoreboard = createScoreboard({ totalPairs: CARDS.length });
  const mascot = createMascot();
  const modal = createModal();
  const sound = createSound();

  const showVictory = ({ moves, place }) => {
    modal.open({
      content: createVictory({
        moves,
        place,
        totalPairs: CARDS.length,
        onNewGame: () => {
          modal.close();
          restartGame();
        },
        onClose: () => modal.close(),
      }),
      labelledBy: VICTORY_TITLE_ID,
      variant: 'victory',
    });
  };

  const showLeaderboard = () => {
    modal.open({
      content: createLeaderboard({
        results: getResults(),
        totalPairs: CARDS.length,
        onClose: () => modal.close(),
      }),
      labelledBy: LEADERBOARD_TITLE_ID,
      variant: 'wide',
    });
  };

  const game = createGame({
    onCardChange: (index, state) => cards[index].setState(state),
    onStatsChange: (stats) => scoreboard.update(stats),
    onFlip: () => sound.play('flip'),
    onMatch: () => {
      sound.play('match');
      mascot.say(getRandomItem(MATCH_PHRASES));
    },
    onMismatch: () => {
      sound.play('mismatch');
      mascot.say(getRandomItem(MISMATCH_PHRASES));
    },
    onHide: () => sound.play('hide'),
    onWin: ({ moves }) => {
      const place = addResult(moves);
      sound.play('win');
      mascot.say(WIN_PHRASE);
      victoryTimer = setTimeout(() => showVictory({ moves, place }), VICTORY_DELAY);
    },
  });

  const board = createBoard({ onCardClick: (index) => game.flip(index) });

  const startGame = () => {
    clearTimeout(victoryTimer);
    const deck = createDeck();
    cards = board.render(deck);
    game.start(deck);
    mascot.say();
  };

  const restartGame = () => {
    sound.play('shuffle');
    startGame();
  };

  header.setSoundState(sound.isEnabled());
  header.newGameButton.addEventListener('click', restartGame);
  header.leaderboardButton.addEventListener('click', showLeaderboard);
  header.soundButton.addEventListener('click', () => {
    header.setSoundState(sound.toggle());
    sound.play('flip');
  });

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

  document.body.append(page, modal.element);
  startGame();
};

initApp();
