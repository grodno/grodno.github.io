import { render } from './render.js';
import { dig, boundFn, cleanUp } from './utils.js';

const resolveSlot = (owner, id, acc) => {
  owner.content.forEach((v, k) => {
    if (id) {
      if (v.tag === owner.tag + ':' + id) {
        v.content.forEach(vv => acc.set(k, vv));
      }
    } else if (v.tag.slice(0, owner.tag.length + 1) !== owner.tag + ':') {
      acc.set(k, v);
    }
  });
  return acc;
};

const resolveTemplateArray = (owner, tmpl, acc = new Map()) =>
  tmpl && tmpl.length ? tmpl.reduce((m, t) => resolveTemplate(owner, t, m), acc) : null;

const resolveProps = (props, owner) =>
  props && props.length ? props.reduce((acc, fnProp) => { fnProp(owner, acc); return acc; }, {}) : null;

function resolveRegular(acc, owner, { type, updates, inits, nodes, uid, id, ref, $if, $each }, tag = type(owner)) {
  if (tag === 'slot') { return resolveSlot(owner, id, acc); }
  const props = resolveProps(updates, owner);
  const content = resolveTemplateArray(owner, nodes)
  return acc.set(tag + uid, { tag, id, ref, owner, inits, $if, $each, props, content });
}

function resolveTemplate(owner, tmpl, acc = new Map()) {
  if (!tmpl) { return acc; }
  if (tmpl.reduce) { return tmpl.length ? resolveTemplateArray(owner, tmpl, acc) : acc; }
  return resolveRegular(acc, owner, tmpl);
}

export class Component {
  constructor(Ctor, options) {
    Object.assign(this, options);
    if (this.parent) {
      this.api = this.parent.api;
      this.impl = Ctor ? new Ctor(this) : new this.api.Element(this);
    } else {
      this.api = this.impl = new Ctor();
    }
    if (this.ref) { this.api.addRef(this.ref, this.impl); }
  }
  renderFragment() {
    const acc = new Map();
    if (this.$each) {
      const $each = this.$each;
      const { $data: data } = this.impl;
      const { itemId, itemNode, emptyNode, loadingNode } = $each;
      const { type, updates, nodes, uid } = itemNode;
      //  this.content = new Map();
      if (data && data.length) {
        data.forEach((d, index) => {
          this.owner.impl[itemId] = d;
          this.owner.impl[itemId + 'Index'] = index;
          const id = `${uid}-$${d.id || index}`;
          resolveTemplate(this.owner, { type, updates, nodes, uid: id }, acc);
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
      // this.content = new Map();
      resolveTemplate(this.owner, node, acc);
    } else {
      this.content.forEach((v, k) => acc.set(k, v));
    }
    render(this, acc, this.ctx);
  }
  render() {
    this.ctx.cursor = this.prevElt;
    if (this.impl.render) {
      this.impl.render(this.ctx);
    } else if (this.tag === 'fragment') {
      this.renderFragment();
    } else {
      render(this, resolveTemplate(this, this.impl.constructor.$TEMPLATE()), this.ctx);
    }
  }
  init() {
    if (this.isDone) { return; }
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
    this.eachChild(c => { c.parent = null; c.done(); });
    if (this.parent) {
      this.parent.children.delete(this.uid);
    }
    if (this.impl.done) {
      this.impl.done(this);
    }
    if (this.defered) {
      this.defered.forEach(f => f(this));
      delete this.defered;
    }
    cleanUp(this);
  }
  defer(fn) { if (fn) { (this.defered || (this.defered = [])).push(fn); } }
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
    const $ = this.impl;
    const v = dig(($.get) ? $.get() : $, propId);
    return (typeof v === 'function') ? boundFn(this, v) : v;
  }
  connect(url, applicator) {
    const cb = (error, r) => this.up({ error, ...(applicator ? applicator(r) : r) })
    return url ? this.api.connect(url, cb) : cb(null, this.owner.impl);
  }
  emit(key, data) {
    const cb = (error, r) => this.up({ error, ...r })
    return key ? this.api.emit(key, data, cb) : cb(null, data);
  }
  resource(...args) {
    return this.api.res(...args);
  }
  pipe(pk, r) {
    const t = this.impl.pipe ? this.impl : this.api;
    return t.pipe.call(t, pk, r, this.impl);
  }
}
