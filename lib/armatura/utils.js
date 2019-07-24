let COUNTER = 1;

export const nope = () => { };
export const fnId = x => x;

export const nextId = (p = '') => p + (COUNTER++);
export const capitalize = (x, pre = '') => {
    if (!x) {
        return pre;
    }
    const s = `${x}`;

    return pre + s[0].toUpperCase() + s.slice(1);
};
export const humanize = key => ('' + key).split('_').map(s => capitalize(s)).join(' ');

const RE_SINGLE_PLACEHOLDER = /^\{\{([a-zA-Z0-9.:_$|]+)\}\}$/;
const RE_PLACEHOLDER = /\{\{([a-zA-Z0-9.:_$|]+)\}\}/g;
export const VALUES = { true: true, false: false, null: null };

// functional
export const fnName = ctor => (/^function\s+([\w$]+)\s*\(/.exec(ctor.toString()) || [])[1] || nextId('$C');

export const runInBrowser = ((w) => fn => w.requestAnimationFrame(() => fn.call(w, w.document)))(window);

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
    return representWithPipes(expr, (key) => (key[0] === ':') ? (k => c => c.string(k))(key.slice(1).trim()) : c => c.prop(key));
}

export function representWithPipes(expr, fn) {
    const pipes = expr.split('|').map(s => s.trim());
    const key = pipes.shift();
    const initial = fn(key);
    return !pipes.length ? initial : c => pipes.reduce((r, pk) => c.represent(r, pk), initial(c));
}

// DOM
export const DOM_SETTERS = {
    '#text': (e, v) => (e.textContent = v == null ? '' : v),
    error: (e, v) => (e.error = v == null ? '' : v),
    disabled: (e, v) => (e.disabled = v ? true : null),
    class: (e, v) => {
        if (v.includes(':')) {
            v = ('' + v).split(' ').map(s => {
                const [cl, expr] = s.split(':')
                if (expr === undefined) return cl;
                const [fl, eq] = expr.split('==');
                const disabled = eq ? fl !== eq : ['', '0', 'false', null].indexOf(fl) > -1;
                return disabled ? '' : cl;
            }).join(' ')
        }
        e.className = v;
    },
    selected: (e, v) => (e.selected = v ? true : null),
    value: (e, v) => (e.value = v == null ? '' : v),
    checked: (e, v) => (e.checked = !!v),
    data: function (e, v) {
        e.$dataset = { ...e.$dataset, ...v };
        if (v) {
            Object.keys(v).forEach(k => { e.dataset[k] = v[k]; });
        }
    },
    click: function (e, v) {
        this.setAttribute('click:click', !v ? null : (ev) => {
            this.$attributes.click({ ...e.$dataset }, ev);
            return false;
        });
    },
    blur: function (e, v) {
        this.setAttribute('blur:blur', !v ? null : (ev) => {
            this.$attributes.blur({ ...e.$dataset }, ev);
            return false;
        });
    },
    dblclick: function (e, v) {
        this.setAttribute('dblclick:dblclick', !v ? null : (ev) => {
            this.$attributes.dblclick({ ...e.$dataset }, ev);
            return false;
        });
    },
    scroll: function (e, v) {
        this.setAttribute('scroll:scroll', !v ? null : (ev) => {
            this.$attributes.scroll({ ...e.$dataset }, ev);
            return false;
        });
    },
    keypress: function (e, v) {
        this.setAttribute('keypress:keyup', !v ? null : (ev) => {
            if (ev.keyCode !== 13 && ev.keyCode !== 27) {
                this.$attributes.keypress({ value: e.value, ...e.$dataset }, ev);
                setTimeout(() => e.focus(), 0)
            }
            return false;
        });
    },
    enter: function (e, v) {
        this.setAttribute('enter:keyup', !v ? null : (ev) => {
            if (ev.keyCode === 13) {
                this.$attributes.enter({ value: e.value, ...e.$dataset }, ev);
            }
            if (ev.keyCode === 13 || ev.keyCode === 27) {
                e.blur();
            }
            return false;
        });
    },
    toggle: function (e, v) {
        this.setAttribute('toggle:change', !v ? null : (ev) => {
            this.$attributes.toggle({ value: e.checked, ...e.$dataset }, ev);
            return false;
        });
    }
};

export const DOM_VALUE_COMPARATORS = {
    value: (e, their, _) => (e.value === their),
    _: (_, their, mine) => their === mine
};
