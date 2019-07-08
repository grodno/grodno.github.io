export * from 'fx';
import { capitalize } from 'fx';

export const grodnify = s => s + ',Гродно,Беларусь'

export const mirror = (x) => (x || '').split('').reduce((r, c) => (c + r), '');
export const camelize = (s, sep = '_') => ((s && s.length && s.split(sep).map((t, i) => (i ? capitalize(t) : t)).join('')) || ``);
export const format = (s, ...args) => ((s && s.length && s.replace(/\{(\d+)\}/g, (_, d) => (args[+d] || ''))) || '');
export const snakeCase = (x) => (x || '').replace(/([a-z])([A-Z])/g, '$1_$2');
export const nope = (x) => x;
export const dig = (obj, key) => key.split('.').reduce((r, k) => !r ? null : r[k], obj);
export const humanize = key => ('' + key).split('_').map(capitalize).join(' ');
export const proper = (s) => capitalize(camelize(s));

export const filterByTags = (data, rtags = []) => data.filter(e => {
  const tags = e.tags || [];
  for (let tag of rtags) {
    if (!tags.includes(tag)) {
      return false;
    }
  }
  return true;
});
export const filterFn = (filter) => (item) => (item.status !== 'deleted') && Object.keys(filter || {}).reduce((r, k) => {
  const [field, op = 'eq'] = k.split('__');
  const value = filter[k];
  return r && (!value || (op === 'eq' ? item[field] === value : item[field].includes(value)));
}, true);
export const showCounts = (counts, postfix = '', prefix = '') => {
  if (!counts) { return 'loading...' }
  const { total, actual } = counts;
  if (!total) { return 'Nothing' }
  if (actual === total) { return total + ' ' + postfix }
  return prefix + " " + actual + ' / ' + total + ' ' + postfix;
}
export const pipes = {
  upper: s => ('' + s).toUpperCase(),
  capitalize,
  serializeParams: x => !x ? '' : Object.keys(x).map(k => `${k}=${x[k]}`).join('&'),
  initials: x => !x ? '' : x.split(' ').slice(0, 2).map(s => s.slice(0, 1).toUpperCase()).join(''),
  not: x => !x,
  translit: x => x,
  rest: x => x ? x.slice(1) : [],
  limit: x => x ? x.slice(0, 50) : [],
  ifAbove: (x, limit = 0) => +x > +limit ? x : '',
  counts: showCounts,
  subject(_s) {
    const s = _s || '';
    return s.slice(0, 50) + (s.length > 50 ? '...' : '');
  },
  ago(s) {
    const val = s || '';
    return (val).fromNow().replace('ago', 'tamu')
      .replace('hours', 'qasow')
      .replace('hour', 'qas')
      .replace('days', 'dzon')
      .replace('day', 'dzen');
  },
  preview(s) {
    return s;
  },
  preview2(s) {

    const val = '' + (s || '');
    return (val
      .replace(/<br\s?\/?>/g, '~')
      .replace(/<.*?>/g, ' ')
      .trim()).split('~');
  },
};
