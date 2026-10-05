import { createSvgElement } from '../utils/create-element.js';
import { ICONS } from '../data/icons.js';

export const createIcon = (name, className) => {
  const paths = ICONS[name].map((d) => createSvgElement('path', { attrs: { d } }));

  return createSvgElement('svg', {
    attrs: {
      class: className,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2.2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'aria-hidden': 'true',
      focusable: 'false',
    },
    children: paths,
  });
};
