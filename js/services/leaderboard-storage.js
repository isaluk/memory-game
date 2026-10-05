const STORAGE_KEY = 'lazy-match-leaderboard';
const MAX_RESULTS = 10;

const isValidResult = (result) =>
  Number.isInteger(result?.moves) && result.moves > 0 && Number.isFinite(result?.date);

const sortResults = (results) => [...results].sort((a, b) => a.moves - b.moves || a.date - b.date);

const readResults = () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

    return Array.isArray(data) ? data.filter(isValidResult) : [];
  } catch {
    return [];
  }
};

const saveResults = (results) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));

    return true;
  } catch {
    return false;
  }
};

export const getResults = () => sortResults(readResults()).slice(0, MAX_RESULTS);

export const addResult = (moves) => {
  const result = { moves, date: Date.now() };
  const results = sortResults([...readResults(), result]).slice(0, MAX_RESULTS);

  saveResults(results);

  const index = results.indexOf(result);

  return index === -1 ? null : index + 1;
};
