import { CARDS } from '../data/cards.js';
import { shuffle } from '../utils/shuffle.js';

export const createDeck = () => shuffle([...CARDS, ...CARDS]);
