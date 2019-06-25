import { render } from './render.js';
import { Element } from './dom.js';
import { ensureApi } from './api.js';
import { dig, boundFn, cleanUp } from './utils.js';

const resolveSlot = (owner, partial, acc) => {
  owner.content.forEach((v, k) => { if (partial ? v.key === partial : !v.key) { acc.set(k, v); } });
  return acc;
};
const resolveTemplateArray = (owner, tmpl, acc = new Map()) => tmpl && tmpl.length ? tmpl.reduce((m, t) => resolveTemplate(owner, t, m), acc) : null;
const resolveProps = (props, owner) => props && props.length ? props.reduce((acc, fnProp) => { fnProp(owner, acc); return acc; }, {}) : null;
function resolveRegular(acc, owner, { type, updates, inits, nodes, uid, key, ref }, tag = type(owner)) {
  if (tag === 'slot') { return resolveSlot(owner, key, acc); }
  return acc.set(tag + uid, { tag, key, ref, owner, inits, props: resolveProps(updates, owner), content: resolveTemplateArray(owner, nodes) });
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
      this.impl = Ctor ? new Ctor(this) : new (this.api.Element || Element)(this);
    } else {
      this.api = this.impl = ensureApi(new Ctor());
    }
    if (this.ref) { this.api.addRef(this.ref, this.impl); }
  }
  renderFragment() {
    const acc = new Map();
    if (this.impl.$each) {
      const { $data: data, $each } = this.impl;
      const { itemId, itemNode, emptyNode } = $each;
      const { type, updates, nodes, uid } = itemNode;
      //  this.content = new Map();
      if (data && data.length) {
        data.forEach((d, index) => {
          this.owner.impl[itemId] = d;
          this.owner.impl[itemId + 'Index'] = index;
          const id = `${uid}-$${d.id || index}`;
          resolveTemplate(this.owner, { type, updates, nodes, uid: id }, acc);
        });
      } else if (emptyNode) {
        resolveTemplate(this.owner, emptyNode, acc);
      }
    } else if (this.impl.$if) {
      const { $data, $if } = this.impl;
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
    this.eachChild(c => { this.parent = null; c.done(); });
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

    c.$assignDepth = (c.$assignDepth || 0) + 1;
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
    if (c.$assignDepth === 1) { this.render(); c.$assignDepth--; }
  }
  prop(propId) {
    const $ = this.impl;
    const v = dig(($.get) ? $.get() : $, propId);
    return (typeof v === 'function') ? boundFn(this, v) : v;
  }
  connect(url, applicator) {
    return this.api.connect(url, (error, r) => error ? this.up({ error }) : this.up(applicator ? applicator(r) : r));
  }
  emit(...args) {
    this.api.emit(...args).then(r => this.up(r)).catch(error => this.up({ error }));
  }
  resource(...args) {
    return this.api.res(...args);
  }
  pipe(pk, r) {
    const t = this.impl.pipe ? this.impl : this.api;
    return t.pipe.call(t, pk, r, this.impl);
  }
}
