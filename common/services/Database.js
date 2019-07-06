import { urlParse, fnId, arrayToHash, dig } from 'fx';
import Dexie from 'dexie';
import { AService } from './AService.js';

export class DatabaseService extends AService {
  constructor(options) {
    super(options);
    const { schema, name = 'dexie' } = this.props;
    const dexie = new Dexie(name, 1);
    dexie.version(1).stores({ ...schema, _meta: 'id' });
    Object.assign(this, {
      dexie,
      remote: this.api.firebase,
      cache: {},
      dbkeys: Object.keys(schema)
    });
  }
  openDb() {
    // Open the database
    this.dexie.open().catch(this.error);
  }
  checkVersion() {
    if (this.api.local.get('$version') !== this.version) {
      this.api.local.assign({ $version: this.version });
    }
  }
  init() {
    this.openDb();
    this.checkVersion()
    this.sync()
  }
  sync() {
    return this.getTable('_meta').toArray()
      .then(m => {
        const meta = arrayToHash(m);
        const ops = this.dbkeys
          .map(coll => this.remote.readCollectionSince(coll, dig(meta, `${coll}_table.last_sync`))
            .then(docs => [coll, docs]));
        return Promise.all(ops);
      })
      .then((r) => this.localUpdate(r.reduce((d, e) => {
        const [coll, docs] = e;
        const lastTs = docs.reduce((last, e) => e.modified_at > last ? e.modified_at : last, 0);
        d[`_meta`].push({ id: `${coll}_table`, last_sync: lastTs });
        d[coll] = docs;
        return d;
      }, { _meta: [] })))
      .then(this.notify)
      .then(() => { this.log('DB sync OK'); })
      .catch((err) => this.log('DB sync error: ' + err));;
  }
  getTable(coll) {
    return this.dexie.table(coll);
  }
  getOne(url) {
    const [kind, id] = url.path;
    let coll = this.getCollection(kind);
    return coll.get(id).then(d => (d ? { ...d, kind } : null));
  }
  getDict(url) {
    const [type] = url.path;
    return this.getCollection('dict').where('type').equals(type).toArray();
  }
  getIndex(url) {
    url = urlParse(url);
    const [kind, index, indexKey, desc] = url.path;
    if (!this.dbkeys.includes(kind)) {
      return null;
    }
    let coll = this.getTable(kind);
    // if (index && indexKey) {
    //   coll = coll.where(index).equals(indexKey);
    //   coll = desc === 'desc' ? coll.desc() : coll;
    // }
    // const filter = url.params;
    // if (filter) {
    //   coll = coll.filter(filterFn(filter));
    // }
    return coll.orderBy('modified_at').reverse().toArray();
  }
  eachDelta(delta, fn = fnId) {
    const bulks = {};
    for (let coll in delta) {
      if (this.dbkeys.includes(coll)) {
        bulks[coll] = delta[coll].map(fn);
      }
    }
    return bulks;
  }
  localUpdate(delta) {
    const bulks = this.eachDelta(delta);
    if (delta._meta) {
      bulks._meta = delta._meta;
    }
    const ops = Object.keys(bulks).map(key => this.dexie[key].bulkPut(bulks[key]));
    return Promise.all(ops);
  }
  async update(delta) {
    await this.localUpdate(delta);
    return this.remote.update(delta);
  }
  async onCreate({ path: [kind], data }) {
    data.id = this.remote.nextId(kind);
    await this.update({ [kind]: [data] });
    this.log('Created', data);
  }
  async onUpdate({ path: [kind], data }) {
    await this.update({ [kind]: [data] });
    this.log('Updated', data);
  }
  async onDelete({ path: [kind, id] }) {
    await this.update({ [kind]: [{ id, status: 'deleted' }] });
    this.log('Deleted', id);
  }
}
