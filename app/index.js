import framework from 'adzin';
import components from '../common/components';
import App from './App.html';
import * as services from '../common/services';
import { loadTemplates } from 'adzin/support.js';
import main from './modules/main.html';
import calendar from './modules/calendar.html';
import geomap from './modules/geomap.html';
import news from './modules/news.html';
import { MyApi } from './api';

const ref = {};
const launch = () => {
  ref.done = framework(
    ...loadTemplates(App, main, news, calendar, geomap),
    ...components,
    ...Object.values(services)
  ).run(MyApi);
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
