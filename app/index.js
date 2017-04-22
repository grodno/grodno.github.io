import { bootstrap, DomRenderer as renderer } from 'ui';
import Application from './Application.js';
import './index.scss';

bootstrap({
  renderer,
  markup:`<Application/>`,
  componentTypes: [ Application ],
  parentElt: document.body
})();

// webpack hot reload
if (module && module.hot) {
  module.hot.accept();
}
