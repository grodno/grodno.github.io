export class AService {
    constructor(props, $) {
        Object.assign(this, props, {
            app: $.app,
            ref: $.ref,
            emit: (...args) => $.emit(...args),
            log: (...args) => console.log($.ref + ': ', ...args),
            error: (error) => console.error($.ref + ': ', error)
        });
    }
}