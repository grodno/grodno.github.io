import framework from '../core/adzin';
import { MyApi } from './api.js';
import components from '../common/components';
import modules from './modules';
import App from './App.html';
import * as services from '../common/services';
import { loadTemplates } from '../common/support.js';

const ref = {};
const launch = () => { ref.done = framework(...loadTemplates(App), ...components, ...modules, ...Object.values(services)).run(MyApi); };

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
