
/** ***********************
 * Objects.
 */

export const isSomething = Object.isSomething = (a) => a !== undef && a !== null;
export const someOr = Object.someOr = (a, def = null) => a === undef || a === null ? def : a;

/**
 * Checks if argument is empty .
 */
export const isEmpty = Object.isEmpty = (x) => {
    if (!x) {
        return true;
    }
    if (x instanceof Object) {
        // (zero-length array)
        if (Array.isArray(x)) {
            return x.length === 0;
        }
        // (zero-size map)
        if (x instanceof Map) {
            return x.size === 0;
        }
        // (has no props)
        return Object.keys(x).length === 0;
    }
    return false;
};

export const deepEquals = Object.equals = (x, y) => {
    if (x === y) {
        return true;
    }
    if (typeof x !== typeof y) {
        return false;
    }
    if (x instanceof Object) {
        // (arrays)
        if (Array.isArray(x) && Array.isArray(y)) {
            return x.length === y.length && !x.find((e, i) => e !== y[i]);
        }
        // (maps)
        if (x instanceof Map) {
            if (x.size !== y.size) return false;
            let eq = true
            x.forEach((value, key) => { if (value !== y.get(key)) { eq = false } })
            return eq;
        }
        // (has no props)
        const keys = Object.keys(x)
        return Object.keys(y).length === keys.length && !keys.find((key) => x[key] !== y[key]);
    }
    return false;
};

/**
 * Checks if ALL arguments are empty .
 */
export const allEmpty = Object.allEmpty = (...xx) => xx.filter(isEmpty).length === xx.length;

/**
 * Checks if SOME arguments are empty .
 */
export const someEmpty = Object.someEmpty = (...xx) => xx.filter(isEmpty).length > 0;

/**
 * Digs value in a given object structure by a given path.
 *
 * @param {*} o source object
 * @param {*} steps path
 * @param {*} def default value
 */
export const dig = Object.dig = (o, steps) => steps.split('.').reduce((r, e) => r ? r[e] : r, o);

export const R = Object.R = Object.assign(
    (key) => R[key] || (R[key] = dig(R, key)),
    { assign: (...objs) => Object.assign(R, ...objs) }
);
