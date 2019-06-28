import framework from '../vendor/perun/index.js';
import { MyApi } from './api.js';
import components from './components/index.js';
import modules from './modules/index.js';
import common from './common/index.js';
import * as services from './services/index.js';

framework(...common, ...components, ...modules, ...Object.values(services)).run(MyApi);

const hot = typeof module === 'undefined' ? null : module.hot;
if (hot) {
  // hot.addStatusHandler(function (d) {})
  // launch(Application, ModuleContainer, ...components, ...pages)
  hot.accept();
}
