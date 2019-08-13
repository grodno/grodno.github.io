import { render } from './render.js';
import { capitalize, humanize, boundFn, cleanUp } from './utils.js';
import { resolveTemplate } from './resolve.js';
import { Element } from './dom.js';

export class Component {

  constructor(Ctor, options) {
    Object.assign(this, options);
    if (this.parent) {
      this.api = this.parent.api;
      this.impl = Ctor
        ? new Ctor({ ref: this.ref, api: this.api, props: this.props })
        : new Element(this, this.props);
    } else {
      this.api = this.impl = new Ctor();
    }
    if (this.ref) {
      const hidden = this.api[this.ref]
      this.api[this.ref] = this.impl;
      this.defer(() => { this.api[this.ref] = hidden })
    }
  }
  resolveFragmentTemplate() {
    const acc = new Map();
    if (this.$each) {
      const $each = this.$each;
      const { $data: data } = this.impl;
      const { itemId, itemNode, emptyNode, loadingNode } = $each;
      const { tag, updates, initials = {}, nodes, uid } = itemNode;
      this.content = new Map();
      if (data && data.length) {
        data.forEach((d, index) => {
          const id = `${uid}-$${d.id || index}`;
          const $owner = Object.create(this.owner)
          const $ownerImpl = Object.create(this.owner.impl)
          Object.assign($ownerImpl, { [itemId]: d, [itemId + 'Index']: index });
          Object.assign($owner, { impl: $ownerImpl });
          resolveTemplate($owner, { tag, initials, updates, nodes, uid: id }, acc);
        });
      } else if (!data) {
        if (loadingNode) { resolveTemplate(this.owner, loadingNode, acc); }
      } else if (!data.length) {
        if (emptyNode) { resolveTemplate(this.owner, emptyNode, acc); }
      }
    } else if (this.$if) {
      const $if = this.$if;
      const { $data } = this.impl;
      const node = $data ? $if.then : $if.else;
      this.content = new Map();
      resolveTemplate(this, node, acc);
    } else if (this.$tag) {
      const tag = this.impl.$data;
      this.content = new Map();
      if (tag) {
        resolveTemplate(this, { ...this.$tag, tag, uid: this.impl.$data + ':' + this.uid }, acc);
      }
    } else if (this.content) {
      this.content.forEach((v, k) => acc.set(k, v));
    }
    return acc;
  }
  render() {
    this.ctx.cursor = this.prevElt;
    if (this.impl.render) {
      this.impl.render(this.ctx);
    } else {
      render(this, this.resolveTemplate(), this.ctx);
    }
  }
  resolveTemplate() {
    if (this.tag === 'ui:fragment') {
      return this.resolveFragmentTemplate()
    }
    return resolveTemplate(this, this.impl.constructor.$TEMPLATE())
  }
  init() {
    if (this.isDone || this.isInited) { return; }
    this.isInited = true;
    if (this.inits) {
      this.inits.forEach(f => this.defer(f(this)));
      delete this.inits;
    }
    if (this.impl.init) {
      this.defer(this.impl.init(this));
    }
  }
  done() {
    if (this.isDone) { return; }
    this.isDone = true;
    if (this.impl.done) {
      this.impl.done(this);
    }
    this.eachChild(c => { c.parent = null; c.done(); });
    if (this.parent) {
      this.parent.children.delete(this.uid);
    }

    if (this.defered) {
      this.defered.forEach(f => f(this));
      delete this.defered;
    }
    cleanUp(this);
  }
  defer(fn) { if (fn && typeof fn === 'function') { (this.defered || (this.defered = [])).push(fn); } }
  eachChild(fn, ch = this.children) { if (ch) { ch.forEach(fn); } }
  up(Δ) {
    if (this.isDone) { return; }
    if (Δ && Δ.then) { Δ.then(r => this.up(r)); return; }
    const c = this;
    const impl = c.impl;

    if (this.impl.set) {
      this.impl.set(Δ);
    } else if (Δ) {
      Object.entries(Δ).forEach(([k, their]) => {
        const mine = impl[k];
        if (typeof their !== 'undefined' && their !== mine) {
          const setter = impl['set' + k[0].toUpperCase() + k.slice(1)];
          if (setter) { setter.call(impl, their); } else { impl[k] = their; }
        }
      });
    }
    (this.parent.rendering ? this : this.parent).render();
  }

  prop(propId) {
    let $ = (this.impl.get) ? this.impl.get() : this.impl;
    const [pk, ...path] = propId.split('.')
    const gettr = $[capitalize(pk, 'get')];
    let value = undefined;
    if (gettr) {
      value = gettr.call($, this)
    } else if (pk in $) {
      value = $[pk];
    } else {
      return this.owner && this.owner.prop && this.tag === 'ui:fragment' ? this.owner.prop(propId) : value;
    }
    if (path.length) {
      value = path.reduce((r, p) => (r ? r[p] : r), value)
    }
    return (typeof value === 'function') ? boundFn(this, value) : value;
  }

  connect(url, applicator) {
    const cb = (error, r) => this.up({ error, ...(applicator ? applicator(r) : r) })
    return this.api.emitter.connect(url, cb, this.impl.data);
  }
  emit(key, data) {
    let $ = this
    for (; $.owner && $.tag === 'ui:fragment'; $ = $.owner) { }
    if (key) {
      this.api.emitter.emit(key, data).then(r => $.up({ error: null, ...r })).catch(error => $.up({ error }));
    } else {
      $.up({ error: null, ...data })
    }
  }
  string(key) {
    return this.resource(key) || humanize(key)
  }
  resource(key) {
    try {
      return Object.R(key);
    } catch (ex) {
      console.error('resource', ex)
      return null;
    }
  }
  represent(value, key) {
    try {
      const [id, ...args] = key.split(':')
      const fn = this.resource('presenters.' + id);
      return fn ? fn.apply(this.impl, [value, ...args]) : value;
    } catch (ex) {
      console.error('reduce', ex)
      return value;
    }
  }
}
