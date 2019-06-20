import * as news from './news.js';
import * as main from './main.js';

const toList = o => Object.keys(o).map(k => typeof o[k] === 'function' ? o[k] : { NAME: k, TEMPLATE: o[k] });

export default [
  ...toList(news),
  ...toList(main)
];
