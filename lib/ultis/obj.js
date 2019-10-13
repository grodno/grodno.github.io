
/** ***********************
 * Objects.
 */

Object.R = (key) => Object.resources[key] || (Object.resources[key] = dig(Object.resources, key));

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
export const dig = Object.dig = (o, steps, def) => {
    const x = steps.split('.').reduce((r, e) => r ? r[e === '0' ? 0 : e] : r, o);
    return typeof x === 'undefined' ? def : x;
};
