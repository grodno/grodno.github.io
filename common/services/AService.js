export class AService {
    constructor(props, $) {
        Object.assign(this, props, {
            api: $.api,
            ref: $.ref,
            emit: (...args) => $.emit(...args),
            log: (...args) => console.log($.ref + ': ', ...args),
            error: (error) => console.error($.ref + ': ', error)
        });
    }
}