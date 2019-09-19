let COUNTER = 1;

export const VALUES = { true: true, false: false, null: null };

export const nope = () => { };

export const fnId = x => x;

export const nextId = (p = '') => p + (COUNTER++);

export const capitalize = (x, pre = '') => {
    if (!x) { return pre; }
    const s = `${x}`;
    return pre + s[0].toUpperCase() + s.slice(1);
};

export const lastTail = (key, sep = '.') => ('' + key).split(sep).slice(-1)[0];

export const humanize = (key, sep = '_', jn = ' ') => ('' + key).split(sep).map(s => capitalize(s)).join(jn);

export const camelize = (key, sep = '_', jn = ' ') => ('' + key).split(sep).map((s, i) => i ? capitalize(s) : s).join(jn);

export const fnName = ctor => (/^function\s+([\w$]+)\s*\(/.exec(ctor.toString()) || [])[1] || nextId('$C');

export const runInBrowser = ((w) => fn => w.requestAnimationFrame(() => fn.call(w, w.document)))(window);
