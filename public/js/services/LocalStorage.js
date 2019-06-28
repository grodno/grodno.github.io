import { nope } from '../utils/index.js';

export class LocalStorage {
  constructor() {
    const cache = {};
    const storage = window.localStorage;

    this.get = (key) => {
      return (cache[key] = JSON.parse(storage.getItem(key) || 'null'));
    };

    this.assign = (delta, cb = nope) => {
      Object.entries(delta).forEach((key, val = null) => {
        cache[key] = val;
        storage.setItem(key, JSON.stringify(val));
      });
      cb();
    };
  }
}
