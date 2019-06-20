import framework from '../vendor/perun/index.js';
import { MyApi } from './api.js';
import components from './components/index.js';
import pages from './pages/index.js';
import common from './common/index.js';

framework(...common, ...components, ...pages).run(MyApi);

const hot = typeof module === 'undefined' ? null : module.hot;
if (hot) {
  // hot.addStatusHandler(function (d) {})
  // launch(Application, ModuleContainer, ...components, ...pages)
  hot.accept();
}
