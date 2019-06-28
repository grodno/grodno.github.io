import { capitalize } from './strings.js';

export const fromJS = o => Object.keys(o).map(k => typeof o[k] === 'function' ? o[k] : { NAME: k, TEMPLATE: o[k] });

export const fromTemplates = (...list) => list
    .map(key => document.getElementById(capitalize(key) + 'Template'))
    .map(top => [...top.import.body.children].map(e => ({ NAME: e.getAttribute('id'), TEMPLATE: e.innerHTML })))
    .reduce((r, e) => r.concat(e), []);
