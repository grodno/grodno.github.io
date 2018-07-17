import { capitalize } from './core/utils.js'
import { urlParse } from './core/url.js'
import { NavStore } from './stores/nav.js'
import { LocalStore } from './stores/local.js'
import { UserStore } from './stores/user.js'
import { IDB } from './stores/idb.js'
import { Firestore } from './core/firebase.js'
import { firebaseConfig, schema } from './config.js'
let cnt = 0
const notFoundMethod = (x) => {
  console.error('Not found' + x)
  // debugger;
  return null
}
// top-level app dispatcher
export class Dispatcher {
  constructor (app) {
    const local = new LocalStore(app.version)
    this.log = (...value) => app.emit('console:log', value)
    this.error = (...value) => app.emit('console:error', value)
    this.emit = (u, x) => app.emit(u, x)
    this.get = (key) => local.get(key)
    this.assign = (key, cb) => local.assign(key, cb)
    this.subscribers = new Map()
    this.notify = (flt) => this.subscribers.forEach(e => !flt || flt(e.url) ? e.fn() : null)
    this.fire = new Firestore(firebaseConfig)
    this.stores = {
      console: {
        onLog: x => window.console.log(x.data),
        onError: x => window.console.error(x.data)
      },
      res: { get: url => app.resource(url.target) },
      local,
      user: new UserStore(this, this.fire),
      db: new IDB(this, app.version, schema, this.fire),
      nav: new NavStore(this)
    }
    Object.keys(this.stores).forEach(key => this.stores[key].init && this.stores[key].init())
  }
  dispatch (key, data) {
    const url = urlParse(key, { data })
    const store = this.stores[url.type] || this
    const method = store['on' + capitalize(url.target)] || notFoundMethod
    const r = method.call(store, url, this.notify)
    if (r && r.then) {
      r.then(this.notify, err => this.error(err))
    }
  }
  subscribe (key, cb) {
    const url = urlParse(key)
    if (url.options === 'once') {
      this.load(url, cb)
      return
    }
    const uuid = cnt++
    const fn = () => this.load(url, cb)
    this.subscribers.set(uuid, {url, fn})
    // this.stores.db.retainCollection(url)
    fn()
    return () => {
      // this.stores.db.releaseCollection(url)
      this.subscribers.delete(uuid)
    }
  }
  load (url, cb) {
    const store = this.stores[url.type || 'res'] || this
    const method = store['get' + capitalize(url.target)] || store['get'] || notFoundMethod
    const val = method.call(store, url)
    if (val && val.then) {
      val.then(r => cb(null, r), cb)
    } else {
      cb(null, val)
    }
  }
}
