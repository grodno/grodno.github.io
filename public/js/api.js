import { LocalStore } from './stores/local.js';
import { IDB } from './stores/idb.js';
import { schema } from './config.js';
import { pipes as PIPES } from './utils/index.js';
import R from './res.js';

export class MyApi {
  constructor() {
    Object.assign(this, { PIPES, R });
    const local = new LocalStore();
    this.get = (key) => local.get(key);
    this.assign = (key, cb) => local.assign(key, cb);
    this.refs2 = {
      local,
      db: new IDB(this, 1, schema, this.fire)
    };
    this.getTags = () => {
      return [
        { name: 'Naviny-tag', id: 'news' },
        { name: 'Calendar', id: 'calendar' },
        { name: 'Liudzi', id: 'people' }
      ];
    };
    // Object.values(this.refs).forEach(r => r.init && r.init());
  }

}

