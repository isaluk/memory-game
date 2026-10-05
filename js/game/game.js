export const MISMATCH_DELAY = 1000;

export const createGame = ({
  onCardChange,
  onStatsChange,
  onFlip,
  onMatch,
  onMismatch,
  onHide,
  onWin,
} = {}) => {
  let cards = [];
  let openedIndexes = [];
  let moves = 0;
  let pairs = 0;
  let isLocked = false;
  let mismatchTimer = null;

  const setCardState = (index, state) => {
    cards[index].state = state;
    onCardChange?.(index, state);
  };

  const notifyStats = () => {
    onStatsChange?.({ moves, pairs });
  };

  const closeMismatchedPair = () => {
    openedIndexes.forEach((index) => setCardState(index, 'closed'));
    openedIndexes = [];
    isLocked = false;
    mismatchTimer = null;
    onHide?.();
  };

  const checkPair = () => {
    const [first, second] = openedIndexes;
    moves += 1;

    if (cards[first].id === cards[second].id) {
      pairs += 1;
      setCardState(first, 'matched');
      setCardState(second, 'matched');
      openedIndexes = [];
      notifyStats();

      if (pairs === cards.length / 2) {
        onWin?.({ moves });
      } else {
        onMatch?.();
      }

      return;
    }

    setCardState(first, 'mismatch');
    setCardState(second, 'mismatch');
    isLocked = true;
    notifyStats();
    onMismatch?.();
    mismatchTimer = setTimeout(closeMismatchedPair, MISMATCH_DELAY);
  };

  const start = (deck) => {
    clearTimeout(mismatchTimer);
    cards = deck.map((card) => ({ ...card, state: 'closed' }));
    openedIndexes = [];
    moves = 0;
    pairs = 0;
    isLocked = false;
    mismatchTimer = null;
    notifyStats();
  };

  const flip = (index) => {
    const card = cards[index];

    if (isLocked || !card || card.state !== 'closed') {
      return;
    }

    setCardState(index, 'open');
    openedIndexes.push(index);
    onFlip?.();

    if (openedIndexes.length === 2) {
      checkPair();
    }
  };

  return { start, flip };
};
