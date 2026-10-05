import { createElement } from '../utils/create-element.js';
import { createIcon } from './icon.js';

const lockScroll = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
};

const unlockScroll = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

export const createModal = () => {
  let handleClose = null;

  const body = createElement('div', { className: 'modal__body' });

  const closeButton = createElement('button', {
    className: 'modal__close',
    attrs: { type: 'button', 'aria-label': 'Закрыть' },
    children: [createIcon('close', 'modal__close-icon')],
  });

  const element = createElement('dialog', {
    className: 'modal',
    children: [
      createElement('div', {
        className: 'modal__panel',
        children: [closeButton, body],
      }),
    ],
  });

  const close = () => {
    if (element.open) {
      element.close();
    }
  };

  const open = ({ content, labelledBy, variant, onClose }) => {
    body.replaceChildren(content);
    element.className = variant ? `modal modal--${variant}` : 'modal';
    element.setAttribute('aria-labelledby', labelledBy);
    handleClose = onClose;

    if (!element.open) {
      element.showModal();
      lockScroll();
    }
  };

  closeButton.addEventListener('click', close);

  element.addEventListener('click', (event) => {
    if (event.target === element) {
      close();
    }
  });

  element.addEventListener('close', () => {
    unlockScroll();
    handleClose?.();
    handleClose = null;
  });

  return { element, open, close };
};
