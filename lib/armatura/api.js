import { urlParse, nextId, capitalize } from 'furnitura';

export class Api {
    constructor() {
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
    }
    emit(key, data) {
        const url = urlParse(key, { data });
        const { type, target } = url;
        try {
            const ref = type ? this[type] : this;
            const method = ref && ref[capitalize(target, 'on')];
            const result = method.call(ref, url);
            const promise = result && result.then ? result : Promise.resolve(result);
            return promise.then(r => { this.notify(type); return r; })
        } catch (ex) {
            console.error('emit ' + type + ':' + target, ex)
            return Promise.reject(ex);
        }
    }

    connect(key, cb) {
        const url = urlParse(key);
        const { type, target } = url;
        return this.subscribe(type, () => {
            try {
                const ref = type ? this[type] : this;
                const method = ref && ref[capitalize(target, 'get')];
                const val = method.call(ref, url);
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
