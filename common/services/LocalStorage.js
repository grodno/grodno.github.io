
const nope = () => { }
const parse = s => s ? JSON.parse(s) : undefined

export class LocalStorage {
  constructor() {
    const nope = () => { };
    const cache = {};
    const storage = window.localStorage;

    this.get = (key) => cache[key] || (cache[key] = parse(storage.getItem(key)));

    this.assign = (delta, cb = nope) => {
      Object.entries(delta).forEach((key, val = null) => {
        cache[key] = val;
        storage.setItem(key, JSON.stringify(val));
      });
      cb();
    };
  }
  transform(key, fn, cb) {
    const e = this.get(key)
    return this.assign({ [key]: fn(e) }, cb)
  }
  toggleItemProperty(key, item, cb) {
    return this.transform(key, (items = {}) => {
      if (items[item.id]) {
        delete items[item.id]
      } else {
        items[item.id] = item
      }
      return items
    }, cb)
  }
  toggleArrayElement(key, item, cb) {
    return this.transform(key, (items = []) => {
      const elt = items.find(e => e.id === item.id)
      return elt ? items.reduce((r, e) => e === elt ? r : r.concat([e]), []) : items.concat([item])
    }, cb)
  }
  arrangeArrayElement(key, id, dir, cb) {
    return this.transform(key, (items = []) => {
      const index = items.indexOf(items.find(e => e.id == id))
      if (index > -1) {
        const from = index + (dir === 'up' ? -1 : 1)
        if (from >= 0 && from < items.length) {
          const r = items[index];
          items[index] = items[from]
          items[from] = r
        }
      }
      return items;
    }, cb)
  }
}
