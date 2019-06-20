import { resolveTemplate } from './resolve.js';
import { render } from './render.js';
import { Element } from './dom.js';
import { ensureApi } from './api.js';
import { dig, boundFn } from './utils.js';

const cleanUp = c => ['parent', 'children', 'owner', 'impl', 'app', 'ctx'].forEach(k => { delete c[k]; });

export class Component {
  constructor(Ctor, options) {
    Object.assign(this, options);
    if (this.parent) {
      this.api = this.parent.api;
      this.impl = Ctor ? new Ctor(this) : new (this.api.Element || Element)(this);
    } else {
      this.api = this.impl = ensureApi(new Ctor());
    }
  }
  init() {
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
  defer(fn) {
    if (fn) { (this.defered || (this.defered = [])).push(fn); }
  }
  eachChild(fn, ch = this.children) {
    if (ch) { ch.forEach(fn); }
  }
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
          if (setter) {
            setter.call(impl, their);
          } else {
            impl[k] = their;
          }
        }
      });
    }

    if (--c.$assignDepth === 0) {
      this.render();
    }
  }
  render() {
    this.ctx.cursor = this.prevElt;
    if (this.impl.render) {
      this.impl.render(this.ctx);
    } else {
      render(this, resolveTemplate(this, this.impl.constructor.$TEMPLATE()), this.ctx);
    }
  }
  prop(propId) {
    const $ = this.impl;
    const v = dig(($.get) ? $.get() : $, propId);
    return (typeof v === 'function') ? boundFn(this, v) : v;
  }
  connect(url, k) {
    return this.api.connect(url, (error, r) => this.up({ error, [k]: r }));
  }
  emit(...args) {
    this.api.emit(...args).then(r => this.up(r)).catch(error => this.up({ error }));
  }
  resource(...args) {
    return this.api.res(...args);
  }
  pipe(pk, r) {
    return this.api.pipe(pk, r, this.impl);
  }
}
