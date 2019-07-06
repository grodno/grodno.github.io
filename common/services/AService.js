export class AService {
    constructor({ api, ref, props }) {
        Object.assign(this, { api, ref });
        this.notify = () => api.notify(ref);
        this.log = (...args) => console.log(ref + ': ', ...args)
        this.error = (error) => console.error(ref + ': ', error)
        this.props = props || {}
    }
}