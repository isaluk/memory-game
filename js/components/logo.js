import { createElement } from '../utils/create-element.js';

export const createLogo = () =>
  createElement('div', {
    className: 'logo',
    children: [
      createElement('img', {
        className: 'logo__image',
        attrs: { src: 'assets/icons/rs-logo.svg', alt: 'RS School', width: '44', height: '44' },
      }),
      createElement('p', {
        className: 'logo__text',
        children: [
          createElement('span', { className: 'logo__title', text: 'Lazy Match' }),
          createElement('span', { className: 'logo__subtitle', text: 'memory game · RS School' }),
        ],
      }),
    ],
  });
