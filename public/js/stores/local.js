import { nope } from '../core/utils.js'

export class LocalStore {
  constructor (version) {
    const cache = {}
    const prefix = version + ':'
    const storage = window.localStorage

    this.get = (key) => {
      return (cache[key] = JSON.parse(storage.getItem(prefix + key) || 'null'))
    }

    this.assign = (delta, cb = nope) => {
      for (let key in delta) {
        const val = delta[key] || null
        cache[key] = val
        storage.setItem(prefix + key, JSON.stringify(val))
      }
      cb()
    }
  }
}
