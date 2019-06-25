import { urlParse } from './url.js';
import { nextId, capitalize, humanize, dig } from './utils.js';

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
        this.notify = (key) => this.listeners(key).forEach(e => e());
    }
    addListener(key, fn) {
        const uuid = nextId();
        this.listeners(key).set(uuid, fn);
        return () => this.listeners(key).delete(uuid);
    }
}
class Api extends Observable {
    constructor() {
        super();
        this.log = (...value) => this.emit('//log', value);
        this.error = (...value) => this.emit('//error', value);
        this.refs = {};
    }
    addRef(key, ref) {
        this.refs[key] = ref;
        return () => { delete this.refs[key]; };
    }
    emit(key, data) {
        const url = urlParse(key, { data });
        const { type, target } = url;
        const ref = type ? this.refs[type] : this;
        const method = ref && ref[capitalize(target, 'on')] || notFoundMethod;
        try {
            const r = method.call(ref, url);
            return ((r && r.then) ? r : Promise.resolve(r)).then((rr) => { this.notify(type); return rr; }, err => this.error(err));
        } catch (ex) {
            return Promise.reject(ex);
        }
    }
    connect(key, cb) {
        const url = urlParse(key);
        const { type, target } = url;
        const fn = () => {
            const ref = type ? this.refs[type] : this;
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
        try {
            return this.addListener(type, fn);
        } finally {
            fn();
        }
    }
    pipe(key, val, state) {
        const r = this.PIPES || {};
        const fn = r[key]; return fn ? fn(val, state) : val;
    }
    res(key, def) {
        const r = this.R || {};
        return r[key] || def || (r[key] = dig(r, key) || humanize(key));
    }
    onLog(x) { window.console.log(x.data); }
    onError(x) { window.console.error(x.data); }
}
const API_STUB = new Api();
export const ensureApi = (api = {}) => {
    api.__proto__ = API_STUB;
    return api;
};
