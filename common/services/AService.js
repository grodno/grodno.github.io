export class AService {
    constructor({ api, ref, props }) {
        Object.assign(this, { ...props, api, ref });
        this.notify = (...args) => api.emitter.notify(ref, ...args);
        this.emit = (...args) => api.emitter.emit(...args);
        this.subscribe = (...args) => api.emitter.subscribe(...args);
        this.log = (...args) => console.log(ref + ': ', ...args)
        this.error = (error) => console.error(ref + ': ', error)
    }
}