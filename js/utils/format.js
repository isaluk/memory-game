export const pluralize = (count, [one, few, many]) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return one;
  }

  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
    return few;
  }

  return many;
};

export const MOVE_FORMS = ['ход', 'хода', 'ходов'];
