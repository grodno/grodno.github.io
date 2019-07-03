
/** ***********************
 * Crypto.
 */

/* Simple GUID generator. */
export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

/* eslint-disable */
/* Simple hash function. */
export const hash = function (s) {
    let a = 1,
        c = 0,
        h,
        o;
    if (s) {
        a = 0;
        /* jshint plusplus:false bitwise:false */
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = (a << 6 & 268435455) + o + (o << 14);
            c = a & 266338304;
            a = c !== 0 ? a ^ c >> 21 : a;
        }
    }
    return String(a);
};