import { render } from './render.js';
import { camelize } from './utils.js';

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
      Object.keys(v).forEach(k => { e.dataset[camelize(k, '-', '')] = v[k]; });
    }
  },
  click: function (e, v) {
    this.setAttribute('click:click', !v ? null : (ev) => {
      this.$attributes.click({ ...e.$dataset }, ev);
      return false;
    });
  },
  'bubble-click': function (e, v) {
    this.setAttribute('bubbled-click:click', !v ? null : (ev) => {
      this.$attributes['bubble-click']({ ...e.$dataset }, ev);
      return true;
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
  error: function (e, v) {
    this.setAttribute('error:error', !v ? null : (ev) => {
      this.$attributes.error({ ...e.$dataset }, ev);
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
  change: function (e, v) {
    this.setAttribute('change:change', !v ? null : (ev) => {
      this.$attributes.change({ value: e.value, ...e.$dataset }, ev);
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

const doc = window.document;

export class Element {

  constructor(attrs = {}, $) {
    this.elt = $.elt = $.tag === '#text' ? doc.createTextNode('') : doc.createElement($.tag);
    this.$attributes = {}
    this.$ = this.elt.$ = $;
    this.applyAttributes(attrs);
  }
  done() {
    const e = this.elt;
    const lstnrs = this.$listeners;
    if (lstnrs) {
      Object.keys(lstnrs).forEach(k => e.removeEventListener(k, lstnrs[k]));
      this.$listeners = null;
    }
    const p = e.parentElement;
    if (p) {
      p.removeChild(e);
    }
    this.elt = this.$attributes = null;
  }
  set(delta) {
    this.delta = this.delta ? Object.assign(this.delta, delta) : delta;
    return this.$.nodes || delta && Object.keys(delta).length;
  }
  render($) {
    const e = this.elt;
    const p = $.ctx;
    if ($.content) {
      e.cursor = null;
      render($, $.content);
      e.cursor = null;
    }
    if (this.delta) {
      this.applyAttributes(this.delta);
      this.delta = null;
    }
    const before = p.cursor ? p.cursor.nextSibling : p.firstChild;
    if (!before) {
      if (p !== e.parentElement) {
        p.appendChild(e);
      }
    } else if (e !== before) {
      p.insertBefore(e, before);
    }
    p.cursor = e;
  }
  applyAttributes(theirs) {
    const e = this.elt;
    const mines = this.$attributes;
    for (let key in theirs) {
      if (theirs.hasOwnProperty(key) && !(DOM_VALUE_COMPARATORS[key] || DOM_VALUE_COMPARATORS._)(e, theirs[key], mines[key])) {
        const value = theirs[key];
        const setter = DOM_SETTERS[key];
        // console.log('setAttribute' + this.$.tag, key, value)
        if (setter) {
          setter.call(this, e, value);
        } else {
          this.setAttribute(key, value);
        }
      }
    }
    this.$attributes = theirs;
  }
  setAttribute(key, value) {
    if (value != null) {
      if (typeof value === 'function') {
        const fnValue = (...args) => { if (!this.isDone) { value(...args) } }
        if (!this.listeners) {
          this.listeners = new Map();
        }
        if (!this.listeners.has(key)) {
          const [akey, ekey = akey] = key.split(':')
          this.elt.addEventListener(ekey, fnValue, false);
          this.listeners.set(key, fnValue);
        }
      } else {
        this.elt.setAttribute(key, value);
      }
    } else {
      if (this.listeners && this.listeners.has(key)) {
        const [akey, ekey = akey] = key.split(':')
        this.elt.removeEventListener(ekey, this.listeners.get(key));
        this.listeners.delete(key);
      } else {
        this.elt.removeAttribute(key);
      }
    }
  }
}
