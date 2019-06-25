let COUNTER = 1;

const RE_SINGLE_PLACEHOLDER = /^\{\{([a-zA-Z0-9._$|]+)\}\}$/;
const RE_PLACEHOLDER = /\{\{([a-zA-Z0-9._$|]+)\}\}/g;
export const VALUES = {
    true: true,
    false: false,
    null: null
};
// functional
export const nextId = (p = '') => p + (COUNTER++);

export const fnName = ctor => (/^function\s+([\w$]+)\s*\(/.exec(ctor.toString()) || [])[1] || next('$C');

export const runInBrowser = ((w) => fn => w.requestAnimationFrame(() => fn.call(w, w.document)))(window);
// Strings

export const capitalize = (x, pre = '') => {
    if (!x) {
        return pre;
    }
    const s = `${x}`;

    return pre + s[0].toUpperCase() + s.slice(1);
};
export const humanize = key => ('' + key).split('_').map(s => capitalize(s)).join(' ');

// Prop

export const boundFn = ($, fn) => {
    const map = $.$boundFnMap || ($.$boundFnMap = new Map());
    let bound = map.get(fn);
    if (!bound) {
        bound = fn.bind($.impl);
        map.set(fn, bound);
    }
    return bound;
};
export const cleanUp = c => ['parent', 'children', 'owner', 'impl', 'app', 'ctx'].forEach(k => { delete c[k]; });

export const dig = (obj, path) => {
    if (!obj || !path) { return; }
    let $ = obj;
    let k = path;
    let posE = k.indexOf('.');
    if (posE === -1) {
        const getter = $[capitalize(k, 'get')];
        return getter ? getter.call($, k) : $[k];
    }
    return dig($[k.slice(0, posE)], k.slice(posE + 1));
};
export const filterMapKey = (src, key) => {
    const r = new Map();
    src.forEach((v, k) => { if (k !== key) { r.set(k, v); } });
    return r;
};
// Compilation
export function expression(v) {
    if (v[0] === ':') { return placeholder(v); }
    if (!v.includes('{{')) { const r = v in VALUES ? VALUES[v] : v; return () => r; }
    if (v.match(RE_SINGLE_PLACEHOLDER)) { return placeholder(v.slice(2, -2).trim()); }
    return stringInterpolation(v);
}

export function stringInterpolation(v, fnx = []) {
    const pattern = v.replace(RE_PLACEHOLDER, (s, expr) => { fnx.push(placeholder(expr)); return '{{' + (fnx.length - 1) + '}}'; });
    return c => pattern.replace(/\{\{(\d+)\}\}/g, (s, idx) => {
        const r = fnx[idx](c);
        return !r && r !== 0 ? '' : r;
    });
}

export function placeholder(expr) {
    const pipes = expr.split('|').map(s => s.trim());
    const key = pipes.shift();
    const initial = (key[0] === ':') ? (k => c => c.resource(k))(key.slice(1).trim()) : c => c.prop(key);
    return !pipes.length ? initial : c => pipes.reduce((r, pk) => c.pipe(pk, r), initial(c));
}
// DOM
export const DOM_SETTERS = {
    '#text': (e, k, v) => (e.textContent = v == null ? '' : v),
    disabled: (e, k, v) => (e[k] = v ? true : null),
    class: (e, k, v) => {
        v = ('' + v).replace(/([a-z0-9]+):([a-z0-9.]*)(==([a-z0-9.]*))?\b/g, (_, cl, fl, hasEq, eq) => {
            const disabled = hasEq ? fl !== eq : ['', '0', 'false', null].indexOf(fl) > -1;
            return disabled ? '' : cl;
        });
        e.setAttribute(k, v);
    },
    selected: (e, k, v) => (e[k] = v ? true : null),
    value: (e, k, v) => (e[k] = v == null ? '' : v),
    checked: (e, k, v) => (e[k] = !!v),
    data: (e, k, v) => { e.$dataset = Object.assign({}, v); },
    'data*': (e, k, v) => { (e.$dataset || (e.$dataset = {}))[k.slice(5)] = v in VALUES ? VALUES[v] : v; },
    enter: function (e, key, v) {
        this.setListener('keyup', !v ? null : (ev) => {
            if (ev.keyCode === 13) {
                this.$attributes[key]({ value: e.value, ...e.$dataset }, ev);
            }
            if (ev.keyCode === 13 || ev.keyCode === 27) {
                e.blur();
            }
            return false;
        });
    },
    toggle: function (e, key, v) {
        this.setListener('change', !v ? null : (ev) => {
            this.$attributes[key]({ value: e.checked, ...e.$dataset }, ev);
            return false;
        });
    }
};
export const DOM_VALUE_COMPARATORS = {
    value: (e, their, _) => (e.value === their),
    data: (e, their, _) => (e.$dataset === their),
    _: (_, their, mine) => their === mine
};
