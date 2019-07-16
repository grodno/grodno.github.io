import { render } from './render.js';
import { DOM_SETTERS, DOM_VALUE_COMPARATORS } from './utils.js';

const doc = window.document;

export class Element {

  constructor($, attrs = {}) {
    this.elt = $.tag === '#text' ? doc.createTextNode('') : doc.createElement($.tag);
    this.$attributes = {}
    this.$ = $;
    this.applyAttributes(attrs);
    // console.log('new element' + $.tag)
  }
  done() {
    const e = this.elt;
    // console.log('done element' + this.$.tag)
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
    this.delta = delta;
    return this.$.nodes || delta && Object.keys(delta).length;
  }
  render(p) {
    const e = this.elt;
    const $ = this.$;
    if ($.content) {
      e.cursor = null;
      render($, $.content, e);
      e.cursor = null;
    }
    if (this.delta) {
      this.applyAttributes(this.delta);
      this.delta = null;
    }
    const before = p.cursor ? p.cursor.nextSibling : p.firstChild;
    if (!before) {
      p.appendChild(e);
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
          setter.call(this, e, key, value);
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
        if (!this.listeners) {
          this.listeners = new Map();
        }
        if (!this.listeners.has(key)) {
          const T = this;
          const fn = (ev) => {
            T.$attributes[key]({ value: T.elt.value, ...T.elt.$dataset }, ev);
            return false;
          };
          this.elt.addEventListener(key, fn, false);
          this.listeners.set(key, fn);
        }
      } else {
        this.elt.setAttribute(key, value);
      }
    } else {
      if (this.listeners && this.listeners.has(key)) {
        this.elt.removeEventListener(key, this.listeners.get(key));
        this.listeners.delete(key);
      } else {
        this.elt.removeAttribute(key);
      }
    }
  }
}
