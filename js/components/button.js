import { createElement } from '../utils/create-element.js';
import { createIcon } from './icon.js';

export const createButton = ({ label, variant = 'primary', icon, className = '' }) =>
  createElement('button', {
    className: `button button--${variant} ${className}`.trim(),
    attrs: { type: 'button' },
    children: [
      icon && createIcon(icon, 'button__icon'),
      createElement('span', { className: 'button__label', text: label }),
    ],
  });
