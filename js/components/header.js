import { createElement } from '../utils/create-element.js';
import { createLogo } from './logo.js';
import { createButton } from './button.js';

export const createHeader = () => {
  const leaderboardButton = createButton({
    label: 'Таблица лидеров',
    variant: 'secondary',
    icon: 'trophy',
    className: 'header__button header__button--leaderboard',
  });

  const newGameButton = createButton({
    label: 'Новая игра',
    variant: 'primary',
    icon: 'restart',
    className: 'header__button',
  });

  const element = createElement('header', {
    className: 'header',
    children: [
      createElement('div', {
        className: 'header__inner',
        children: [
          createLogo(),
          createElement('div', {
            className: 'header__actions',
            attrs: { role: 'group', 'aria-label': 'Управление игрой' },
            children: [leaderboardButton, newGameButton],
          }),
        ],
      }),
    ],
  });

  return { element, newGameButton, leaderboardButton };
};
