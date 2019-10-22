let COUNTER = 1;

export const nope = () => { };

export const fnId = x => x;

export const nextId = (p = '') => p + (COUNTER++);

export const methodName = (x, pre = '') => {
    if (!x) { return pre; }
    const s = `${x}`;
    return pre + s[0].toUpperCase() + s.slice(1);
};

export const camelize = (key, sep = '_', jn = ' ') => ('' + key).split(sep).map((s, i) => i ? s[0].toUpperCase() + s.slice(1) : s).join(jn);

export const fnName = ctor => (/^function\s+([\w$]+)\s*\(/.exec(ctor.toString()) || [])[1] || nextId('$C');

export const runInBrowser = fn => window.requestAnimationFrame(() => fn.call(window, document));
