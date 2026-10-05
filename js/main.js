import { createElement } from './utils/create-element.js';
import { createHeader } from './components/header.js';
import { createIntro } from './components/intro.js';
import { createPlayground } from './components/playground.js';
import { createFooter } from './components/footer.js';

const initApp = () => {
  const header = createHeader();
  const playground = createPlayground();

  const main = createElement('main', {
    className: 'page__main',
    children: [createIntro(), playground.element],
  });

  const page = createElement('div', {
    className: 'page',
    children: [header.element, main, createFooter()],
  });

  document.body.append(page);
};

initApp();
