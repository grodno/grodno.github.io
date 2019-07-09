export class AService {
    constructor({ api, ref, props }) {
        Object.assign(this, { ...props, api, ref });
        this.notify = (...args) => api.notify(ref, ...args);
        this.emit = (...args) => api.emit(...args);
        this.log = (...args) => console.log(ref + ': ', ...args)
        this.error = (error) => console.error(ref + ': ', error)
    }
}