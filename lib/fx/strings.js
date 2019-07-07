/**
 * Formats given string template with params.
 *
 * Template should contain placeholders like `{someKey}`,
 * which will be replaced with value by key from params.
 *
 * @param {string} template string template
 * @param {object} params hash with parameters
 */
export const formatString = (template, params) => {
    if (!template) {
        return '';
    }
    return `${template}`.replace(/\{([\S]+)\}/i, (_, key) => ((params && params[key]) != null) ? params[key] : '');
};

export const capitalize = (x, pre = '') => {
    if (!x) {
        return pre;
    }
    const s = `${x}`;

    return pre + s[0].toUpperCase() + s.slice(1);
};
export const tail = (x, sep = '.') => {
    if (!x) {
        return '';
    }
    const pos = x.lastIndexOf(sep);

    return pos === -1 ? x : x.slice(pos + sep.length);
};

export const head = (x, sep = '.') => {
    if (!x) {
        return '';
    }
    const pos = x.indexOf(sep);

    return pos === -1 ? x : x.slice(0, pos);
};
export const humanize = key => ('' + key).split('_').map(s => capitalize(s)).join(' ');
