import framework from '../vendor/adzin/index.js';
import { MyApi } from './api.js';
import components from './components/index.js';
import modules from './modules/index.js';
import common from './common/index.js';
import App from './common/App.html';
import * as services from './services/index.js';

const ref = {};
const C = [];
App.replace(/<template\sid="(.+)"\>([\s\S]*)<\/template>/gm, (s, id, templ) => C.push({ NAME: id, TEMPLATE: templ }));

const launch = () => { ref.done = framework(...C, ...common, ...components, ...modules, ...Object.values(services)).run(MyApi); };

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
