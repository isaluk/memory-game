import { createElement } from '../utils/create-element.js';

const GITHUB_URL = 'https://github.com/isaluk';
const RS_SCHOOL_URL = 'https://rs.school/';

const createLink = (href, text) =>
  createElement('a', {
    className: 'footer__link',
    text,
    attrs: { href, target: '_blank', rel: 'noopener noreferrer' },
  });

export const createFooter = () =>
  createElement('footer', {
    className: 'footer',
    children: [
      createElement('p', {
        className: 'footer__text',
        children: [
          '© 2026 · ',
          createLink(GITHUB_URL, 'isaluk'),
          ' · учебный проект ',
          createLink(RS_SCHOOL_URL, 'RS School'),
        ],
      }),
    ],
  });
