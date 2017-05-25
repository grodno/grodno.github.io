import { PRE, POST, MAP } from './const.js';

const _map = (s)=> s.split('').map(x=>(MAP[x] || x)).join('');

const mreplace = (arr, x)=> arr.reduce((s, [re, sub])=>s.replace(re, sub), x);

export const cyrlat = (s) => mreplace(POST, _map(mreplace(PRE, s)));
