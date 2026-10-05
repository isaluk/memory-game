import { createElement } from '../utils/create-element.js';
import { createLogo } from './logo.js';
import { createButton } from './button.js';
import { createIcon } from './icon.js';

export const createHeader = () => {
  const soundButton = createButton({
    label: 'Звук',
    variant: 'secondary',
    icon: 'soundOn',
    className: 'header__button header__button--sound',
  });

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
            children: [soundButton, leaderboardButton, newGameButton],
          }),
        ],
      }),
    ],
  });

  const setSoundState = (isOn) => {
    soundButton.setAttribute('aria-pressed', String(isOn));
    soundButton.setAttribute('title', isOn ? 'Выключить звук' : 'Включить звук');
    soundButton.querySelector('.button__icon').replaceWith(createIcon(isOn ? 'soundOn' : 'soundOff', 'button__icon'));
  };

  return { element, newGameButton, leaderboardButton, soundButton, setSoundState };
};
