// import { translit } from './mova.js'
import { urlParse } from './url.js'

export const mirror = (x) => (x || '').split('').reduce((r, c) => (c + r), '')
export const camelize = (s, sep = '_') => ((s && s.length && s.split(sep).map((t, i) => (i ? capitalize(t) : t)).join('')) || ``)
export const format = (s, ...args) => ((s && s.length && s.replace(/\{(\d+)\}/g, (_, d) => (args[+d] || ''))) || '')
export const snakeCase = (x) => (x || '').replace(/([a-z])([A-Z])/g, '$1_$2')
export const nope = (x) => x
export const dig = (obj, key) => key.split('.').reduce((r, k) => !r ? null : r[k], obj)
export const humanize = key => ('' + key).split('_').map(capitalize).join(' ')
export const capitalize = (s) => s ? s.slice(0, 1).toUpperCase() + s.slice(1) : ''
export const proper = (s) => capitalize(camelize(s))

export function hashToArray (hash) {
  return Object.keys(hash)
    .map(k => hash[k])
}

export function restoreHotReload ($) {
  const hot = module && module.hot
  if (hot) {
    hot.addStatusHandler(function (d) {})
    // hot.accept();
    hot.dispose(d => {
      d.data = $.data
    })
    const data = hot.data
    if (data) {
      return data.data || {}
    }
  }
  return {}
}

export const filterByTags = (data, rtags = []) => data.filter(e => {
  const tags = e.tags || []
  for (let tag of rtags) {
    if (!tags.includes(tag)) {
      return false
    }
  }
  return true
})
export const filterFn = (filter) => (item) => (item.status !== 'deleted') && Object.keys(filter || {}).reduce((r, k) => {
  const [field, op = 'eq'] = k.split('__')
  const value = filter[k]
  return r && (!value || (op === 'eq' ? item[field] === value : item[field].includes(value)))
}, true)

export function transformNews (data) {
  const filter = this.filter
  const sortBy = this.sortBy
  const tags = this.tags
  let items = data ? data.filter(filterFn(filter)) : data
  if (items && tags) {
    items = items.filter(e => tags.reduce((r, tag) => r && e.tags && e.tags.includes(tag), true))
  }
  if (items && sortBy) {
    items = items.sort((e1, e2) => e1[sortBy] < e2[sortBy] ? 1 : -1)
  }
  return items
}

export const pipes = {
  upper: s => ('' + s).toUpperCase(),
  capitalize,
  serializeParams: x => !x ? '' : Object.keys(x).map(k => `${k}=${x[k]}`).join('&'),
  initials: x => !x ? '' : x.split(' ').slice(0, 2).map(s => s.slice(0, 1).toUpperCase()).join(''),
  translit: x => x,
  urlHost: x => urlParse(x).target,
  subject (_s) {
    const s = _s || ''
    return s.slice(0, 50) + (s.length > 50 ? '...' : '')
  },
  ago (s) {
    const val = s || ''
    return (val).fromNow().replace('ago', 'tamu')
      .replace('hours', 'qasow')
      .replace('hour', 'qas')
      .replace('days', 'dzon')
      .replace('day', 'dzen')
  },
  preview (s) {
    const val = '' + (s || '')
    return (val
      .replace(/<br\s?\/?>/g, '~')
      .replace(/<.*?>/g, ' ')
      .trim()).split('~')
  },
  transformNews
}
