import { nextId, capitalize } from './utils.js';
import { urlParse } from './url.js';

export class EventEmitter {
    constructor(api) {
        const bundle = {};

        this.notify = (key, ...args) => {
            const listeners = bundle[key];
            if (listeners) { bundle[key].forEach(e => e(...args)) }
        }
        this.subscribe = (key, fn) => {
            const uuid = nextId();
            const listeners = (bundle[key] || (bundle[key] = new Map()))
            fn();
            listeners.set(uuid, fn);
            return () => listeners.delete(uuid);
        }
        this.emit = (key, data) => {
            const url = urlParse(key, { data });
            const { type, target } = url;
            try {
                const ref = type ? api[type] : api;
                const method = ref && ref[capitalize(target, 'on')];
                const result = method.call(ref, url);
                const promise = result && result.then ? result : Promise.resolve(result);
                return promise.then(r => { this.notify(type); return r; })
            } catch (ex) {
                console.error('emit ' + type + ':' + target, ex)
                return Promise.reject(ex);
            }
        }
        this.connect = (key, cb, ctx) => {
            const url = urlParse(key);
            const { type, target } = url;
            return this.subscribe(type, () => {
                try {
                    const ref = type ? api[type] : api;
                    const method = ref && ref[capitalize(target, 'get')];
                    const val = method.call(ref, { ...url, data: ctx.data });
                    if (val && val.then) {
                        val.then(r => cb(null, r), cb);
                    } else {
                        cb(null, val);
                    }
                } catch (ex) {
                    console.error('connect ' + type + ':' + target, ex)
                    cb(ex);
                }
            });
        }
    }
}
export class Api {
    constructor() {
        this.emitter = new EventEmitter(this)
    }
}

export class ApiService {
    constructor({ api, ref, props }) {
        Object.assign(this, { ...props, api, ref });
        this.notify = (...args) => api.emitter.notify(ref, ...args);
        this.emit = (...args) => api.emitter.emit(...args);
        this.emitToMe = (key, ...args) => api.emitter.emit(ref + ':' + key, ...args);
        this.subscribe = (...args) => api.emitter.subscribe(...args);
        this.log = (...args) => console.log(ref + ': ', ...args)
        this.error = (error) => console.error(ref + ': ', error)
    }
}