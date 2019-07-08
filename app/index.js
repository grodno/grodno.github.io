import { register } from 'armatura';
import components from '../common/components';
import App from './App.html';
import * as commonServices from '../common/services';
import * as services from './services';
import { loadTemplates } from 'armatura/support.js';
import main from './modules/main.html';
import calendar from './modules/calendar.html';
import geomap from './modules/geomap.html';
import news from './modules/news.html';

import { dig } from 'furnitura';
import res from './res.js';
import meta from './meta.js'
import { reducers } from './utils';

Object.R = (R => (key) => R[key] || (R[key] = dig(R, key)))({ ...res, ...meta.result, reducers });

const ref = {};
const launch = () => {
  ref.done = register(
    ...loadTemplates(App, main, news, calendar, geomap),
    ...components,
    ...Object.values(commonServices),
    ...Object.values(services)
  ).run();
};

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
