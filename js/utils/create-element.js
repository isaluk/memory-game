const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const setAttributes = (element, attrs) => {
  Object.entries(attrs).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
};

export const createElement = (tag, { className, text, attrs = {}, children = [] } = {}) => {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  setAttributes(element, attrs);
  element.append(...children.filter(Boolean));

  return element;
};

export const createSvgElement = (tag, { attrs = {}, children = [] } = {}) => {
  const element = document.createElementNS(SVG_NAMESPACE, tag);

  setAttributes(element, attrs);
  element.append(...children.filter(Boolean));

  return element;
};
