import framework from '../vendor/adzin/index.js';
import { MyApi } from './api.js';
import components from './components/index.js';
import modules from './modules/index.js';
import common from './common/index.js';
import App from './common/App.html';
import * as services from './services/index.js';
import { loadTemplates } from './utils/support.js';

const ref = {};
const launch = () => { ref.done = framework(...loadTemplates(App), ...common, ...components, ...modules, ...Object.values(services)).run(MyApi); };

((hot) => {
  if (!hot) {
    launch();
    return;
  }

  hot.dispose(data => ref.done());
  hot.accept();

  if (!hot.data) {
    launch();
    return;
  }

  window.firebase.app().delete().then(launch);
})(typeof module === 'undefined' ? null : module.hot);
