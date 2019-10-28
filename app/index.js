import 'ultis';
import './res.js';
import { register } from 'armatura';

import components from 'components';
import App from './App.html';
import * as commonServices from 'services';
import { loadTemplates } from 'components/support.js';

import main from './modules/main.html';
import calendar from './modules/calendar.html';
import geomap from './modules/map.html';
import news from './modules/news.html';
import ads from './modules/ads.html';
import others from './modules/others.html';


const types = [
  ...loadTemplates(App, main, news, ads, calendar, geomap, others),
  ...components,
  ...Object.values(commonServices),
]

let app = {};

const launch = () => { app = register(...types).run(); };

((hot) => {
  if (!hot) {
    launch();
    return;
  }

  hot.dispose(data => app.done());
  hot.accept();

  if (!hot.data) {
    launch();
    return;
  }

  window.firebase.app().delete().then(launch);
})(typeof module === 'undefined' ? null : module.hot);
