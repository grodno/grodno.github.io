/**
 * Formats given string template with params.
 *
 * Template should contain placeholders like `{someKey}`,
 * which will be replaced with value by key from params.
 *
 * @param {string} template string template
 * @param {object} params hash with parameters
 */
export const formatString = String.format = (template, params) => {
    if (!template) {
        return '';
    }
    return `${template}`.replace(/\{([\S]+)\}/i, (_, key) => ((params && params[key]) != null) ? params[key] : '');
};

export const capitalize = String.capitalize = (x) => {
    if (!x) {
        return x;
    }
    const s = `${x}`;

    return s[0].toUpperCase() + s.slice(1);
};
export const tail = String.tail = (x, sep = '.') => {
    if (!x) {
        return '';
    }
    const pos = x.lastIndexOf(sep);

    return pos === -1 ? x : x.slice(pos + sep.length);
};
export const lastTail = String.lastTail = (key, sep = '.') => ('' + key).split(sep).slice(-1)[0];

export const head = String.head = (x, sep = '.') => {
    if (!x) {
        return '';
    }
    const pos = x.indexOf(sep);

    return pos === -1 ? x : x.slice(0, pos);
};

export const mirror = String.mirror = (x) => (x || '').split('').reduce((r, c) => (c + r), '');

export const camelize = String.camelize = (s, sep = '_') => ((s && s.length && s.split(sep).map((t, i) => (i ? capitalize(t) : t)).join('')) || ``);
export const snakeCase = String.snakeCase = (x) => (x || '').replace(/([a-z])([A-Z])/g, '$1_$2');
export const humanize = String.humanizeKey = key => lastTail('' + key).split('_').map(capitalize).join(' ');
export const proper = String.proper = (s) => capitalize(camelize(s));
