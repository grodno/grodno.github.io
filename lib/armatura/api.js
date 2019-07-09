import { urlParse, nextId, capitalize } from 'furnitura';

const notFoundMethod = ({ type, target }) => {
    const message = 'API method not found: ' + type + ':' + target;
    console.error(message);
    // debugger;
    throw new ReferenceError(message);
};
class Observable {
    constructor() {
        const bundle = {};
        this.listeners = (key) => bundle[key] || (bundle[key] = new Map());
        this.notify = (key, ...args) => this.listeners(key).forEach(e => e(...args));
        this.res = {
            getResource({ path }) {
                return Object.R(path[0])
            }
        }
    }
    addListener(key, fn, runImmediately) {
        const uuid = nextId();
        this.listeners(key).set(uuid, fn);
        if (runImmediately) {
            fn();
        }
        return () => this.listeners(key).delete(uuid);
    }
}

export class Api extends Observable {

    emit(key, data, _cb) {
        const url = urlParse(key, { data });
        const { type, target } = url;
        const ref = type ? this[type] : this;
        const method = ref && ref[capitalize(target, 'on')] || notFoundMethod;
        const cb = (err, r) => { if (_cb) { _cb(err, r); } this.notify(type); };
        let result = null;
        try {
            result = method.call(ref, url);
            if (result && result.then) {
                result.then(rr => cb(null, rr), cb);
            } else {
                cb(null, result);
            }
        } catch (ex) {
            cb(ex);
        }
    }

    connect(key, cb) {
        const url = urlParse(key);
        const { type, target } = url;
        const fn = () => {
            const ref = type ? this[type] : this;
            const method = ref && ref[capitalize(target, 'get')] || notFoundMethod;
            try {
                const val = method.call(ref, url);
                if (val && val.then) {
                    val.then(r => cb(null, r), cb);
                } else {
                    cb(null, val);
                }
            } catch (ex) {
                cb(ex);
            }
        };
        return this.addListener(type, fn, true);
    }
}
