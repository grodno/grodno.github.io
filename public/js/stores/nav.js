import { urlParse } from '../core/url.js'

export class NavStore {
  constructor (top) {
    this.get = x => top.get(x)
    this.assign = (x, cb) => top.assign(x, cb)
  }
  onHashchange ({data: {value}}, cb) {
    const url = urlParse(value)
    const module = url.target || this.get('module')
    const key = `${module}_context`
    const ctx = this.get(key) || {}
    this.assign({
      module,
      [key]: {...ctx, ...url.params, module}
    }, cb)
  }
  getItems () {
    return [
      {name: 'Naviny', id: 'news'},
      {name: 'Calendar', id: 'calendar'},
      {name: 'Liudzi', id: 'people'}
    ]
  }
  getItem () {
    const item = this.getItems().find(e => e.id === this.module) || {}
    const modes = item.subs || []
    const mode = this.mode || ''
    const current = modes.find(e => e.id === mode) || {id: '', name: '...'}
    return {path: [{id: `${item.id}`, name: item.name}], modes, current}
  }

  // context
  getContext () {
    const module = this.get('module')
    const key = `${module}_context`
    const ctx = this.get(key)
    const city = this.getCity()
    return {...ctx, city}
  }

  updateCurrentContext (delta, cb) {
    const module = this.get('module')
    const key = `${module}_context`
    const ctx = this.get(key)
    return this.assign({[key]: { ...ctx, ...delta }}, cb)
  }

  getCity () {
    return this.get('city') || {}
  }

  onUpdate ({path: [ns], data}, cb) {
    this.assign(ns ? {[ns]: data} : data, cb)
  }
  onUpdateContext ({data}, cb) {
    this.updateCurrentContext(data, cb)
  }
  onClose (_, cb) {
    return this.updateCurrentContext({open: false, newEntry: null, id: null}, cb)
  }
  onAddNew (_, cb) {
    return this.updateCurrentContext({open: true, newEntry: {}, id: null}, cb)
  }
  onOpenItem ({data: {value}}, cb) {
    return this.updateCurrentContext({open: true, id: value, newEntry: null}, cb)
  }
  onSort ({data: {value}}, cb) {
    return this.updateCurrentContext({sortBy: value}, cb)
  }
}
