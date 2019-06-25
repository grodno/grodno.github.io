import framework from '../vendor/perun/index.js';
import { MyApi } from './api.js';
import components from './components/index.js';
import pages from './pages/index.js';
import common from './common/index.js';
import { NavStore } from './stores/nav.js';
import { UserStore } from './stores/user.js';
import { Firebase } from './services/Firebase.js';

framework(...common, ...components, ...pages, NavStore, UserStore, Firebase).run(MyApi);

const hot = typeof module === 'undefined' ? null : module.hot;
if (hot) {
  // hot.addStatusHandler(function (d) {})
  // launch(Application, ModuleContainer, ...components, ...pages)
  hot.accept();
}
