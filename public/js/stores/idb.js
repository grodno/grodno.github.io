import { nope, filterFn, dig } from '../core/utils.js'
import { urlParse } from '../core/url.js'

export class IDB {
  constructor (top, version, schema, remote) {
    const db = new window.Dexie(version)
    db.version(1).stores({...schema, _meta: 'id'})
    // Open the database
    db.open().catch(function (error) {
      this.error('DB.open: ' + error)
    })
    Object.assign(this, {
      log: top.log,
      top,
      version,
      db,
      cache: {},
      realtimes: {},
      dbkeys: Object.keys(schema),
      remote
    })
  }
  init () {
    if (this.top.get('$version') !== this.version) {
      this.top.assign({$version: this.version})
    } else {
      this.sync()
        .then(() => { this.log('DB sync OK'); this.top.notify(u => u.type === 'db') })
        .catch((err) => this.log('DB sync error: ' + err))
    }
  }
  sync () {
    return this.getCollection('_meta').toArray()
      .then(m => {
        const meta = m.reduce((r, e) => { r[e.id] = e; return r }, {})
        const ops = this.dbkeys.map(coll => this.syncCollection(coll, dig(meta, `${coll}_table.last_sync`)).then(docs => [coll, docs]))
        return Promise.all(ops)
      })
      .then((r) => this.localUpdate(r.reduce((d, e) => {
        const docs = e[1]
        const lastTs = docs.reduce((last, e) => e.modified_at > last ? e.modified_at : last, 0)
        d[`_meta`].push({ id: `${e[0]}_table`, last_sync: lastTs })
        d[e[0]] = docs
        return d
      }, { _meta: [] })))
  }
  syncCollection (coll, ts = 0) {
    return this.remote.readCollectionSince(coll, ts)
  }
  getCollection (coll) {
    return this.db[coll]
  }
  retainCollection (url) {
    if (url.type === 'db') {
      const [coll] = url.path
      if (this.realtimes[coll]) {
        this.realtimes[coll].counter++
      } else {
        this.realtimes[coll] = {counter: 1}
        const fn = ts => {
          const flt = u => u.type === 'db' && u.path[0] === coll
          const cb = (_, delta) => this.localUpdate(delta).then(() => this.top.notify(flt))
          this.realtimes[coll].unsubscribe = this.remote.listenCollection(coll, ts, cb)
        }
        this.getCollection('_meta').get(`${coll}_table`).then(m => fn(m.last_sync), () => fn(0))
      }
    }
  }
  releaseCollection (url) {
    if (url.type === 'db') {
      const [coll] = url.path
      if (this.realtimes[coll]) {
        this.realtimes[coll].counter--
        if (this.realtimes[coll].counter === 0) {
          this.realtimes[coll].unsubscribe()
        }
      }
    }
  }
  getOne (url) {
    const [kind, id] = url.path
    let coll = this.getCollection(kind)
    return coll.get(id).then(d => ({...d, kind}))
  }
  getDict (url) {
    const [type] = url.path
    return this.getCollection('dict').where('type').equals(type).toArray()
  }
  getIndex (url) {
    url = urlParse(url)
    const [kind, index, indexKey] = url.path
    if (!this.dbkeys.includes(kind)) {
      return null
    }
    let coll = this.getCollection(kind)
    if (index && indexKey) {
      coll = coll.where(index).equals(indexKey)
    }
    const filter = url.params
    if (filter) {
      coll = coll.filter(filterFn(filter))
    }
    return coll.toArray()
  }
  eachDelta (delta, fn = nope) {
    const bulks = {}
    for (let coll in delta) {
      if (this.dbkeys.includes(coll)) {
        bulks[coll] = delta[coll].map(fn)
      }
    }
    return bulks
  }
  localUpdate (delta) {
    const bulks = this.eachDelta(delta)
    if (delta._meta) {
      bulks._meta = delta._meta
    }
    const ops = Object.keys(bulks).map(key => this.db[key].bulkPut(bulks[key]))
    return Promise.all(ops)
  }
  update (delta) {
    return this.localUpdate(delta).then(() => {
      return this.remote.update(delta)
    })
  }
  onCreate ({path: [kind], data}) {
    data.id = this.remote.nextId(kind)
    return this.update({[kind]: [data]}).then(() => {
      this.log('Created', data)
    })
  }
  onUpdate ({path: [kind], data}) {
    return this.update({[kind]: [data]}).then(() => {
      this.log('Updated', data)
    })
  }
  onDelete ({path: [kind, id]}) {
    return this.update({[kind]: [{id, status: 'deleted'}]})
      .then(() => {
        this.top.emit('nav:close')
        this.log('Deleted', id)
      })
  }
}
