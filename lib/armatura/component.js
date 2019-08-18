import { render } from './render.js';
import { capitalize, humanize, boundFn, cleanUp, nextId, runInBrowser } from './utils.js';
import { urlParse } from './url.js';
import { resolveTemplate } from './resolve.js';
import { Element } from './dom.js';

export class Component {

  constructor(ctor, options) {
    Object.assign(this, options);
    const { ref, parent, props } = this
    const Ctor = ctor || Element;
    if (parent) {
      this.api = parent.api;
      if (ref) {
        Object.assign(props, {
          api: this.api,
          ref,
          emit: (...args) => this.emit(...args),
          log: (...args) => console.log(ref + ': ', ...args),
          error: (error) => console.error(ref + ': ', error)
        });
      }
      this.impl = new Ctor(props, this);
      this.impl.$ = this;
    } else {
      this.api = this.impl = new Ctor();
    }
    if (ref) {
      const hidden = this.api[ref]
      this.api[ref] = this.impl;
      this.defer(() => { this.api[ref] = hidden })
    }
  }
  resolveFragmentTemplate() {
    const acc = new Map();
    if (this.$each) {
      const $each = this.$each;
      const { $data: data } = this.impl;
      const { itemId, itemNode, emptyNode, loadingNode } = $each;
      const { tag, updates, initials = {}, nodes, uid } = itemNode;
      if (data && data.length) {
        if (!data.forEach) {
          throw new Error('wrong ui:each data', data)
        }
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
      resolveTemplate(this, node, acc);
    } else if (this.$tag) {
      const tag = this.impl.$data;
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
      if (this.prevElt) {
        this.prevElt.nextElt = this.nextElt;
      }
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
    let changed = false;
    if (this.impl.set) {
      changed = this.impl.set(Δ);
    } else if (Δ) {
      Object.entries(Δ).forEach(([k, their]) => {
        const mine = impl[k];
        if (typeof their !== 'undefined' && their !== mine) {
          const setter = impl['set' + k[0].toUpperCase() + k.slice(1)];
          if (setter) { setter.call(impl, their); } else { impl[k] = their; }
          changed = true;
        }
      });
    }
    this.render();
    if (this.ref && changed) { this.notify(); }
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

  get actualOwner() {
    let $ = this
    for (; $.owner && $.tag === 'ui:fragment'; $ = $.owner) { }
    return $
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
  pipe(value, key) {
    try {
      const [id, ...args] = key.split(':')
      const fn = this.resource('pipes.' + id);
      return fn ? fn.apply(this.impl, [value, ...args]) : value;
    } catch (ex) {
      console.error('reduce', ex)
      return value;
    }
  }
  raceCondition(key) {
    const COUNTERS = this.$weak || (this.$weak = new Map())
    const counter = 1 + (COUNTERS.get(key) || 0);
    COUNTERS.set(key, counter)
    return (fn) => {
      if (counter === COUNTERS.get(key)) { runInBrowser(fn) };
    }
  }
  /**
   *  Arrows.
   */
  notify() {
    if (this.listeners && !this.notifying) {
      this.notifying = true
      this.listeners.forEach(e => e(this.impl))
      this.notifying = false
    }
  }
  subscribe(fn) {
    const uuid = nextId();
    const listeners = (this.listeners || (this.listeners = new Map()))
    fn(this.impl);
    listeners.set(uuid, fn);
    return () => listeners.delete(uuid);
  }
  connect(key, applicator) {
    const data = this.impl.data;
    const url = urlParse(key, { data });
    const { type = this.ref, target } = url;
    const ref = this.api[type];
    if (!ref) { console.error('connect: No such ref ' + type, key) }
    return ref && ref.$.subscribe(() => {
      try {
        const racer = this.raceCondition(type + ':load:' + target);
        const callback = (error, r) => racer(() => this.up({ error, ...(applicator ? applicator(r) : r) }))
        const result = ref.$.prop(target);
        result && result.then ? result.then(r => callback(null, r), callback) : callback(null, result);
      } catch (ex) {
        console.error('connect ' + type + ':' + target, ex)
        this.up({ [type + 'Error']: ex });
      }
    });
  }

  emit(key, data) {
    if (key) {
      const event = urlParse(key, { data });
      const { type = this.ref, target } = event;
      const racer = this.raceCondition(type + ':on:' + target);
      const send = event.send = r => racer(() => this.up(r))
      const ref = this.api[type];
      try {
        if (!ref) { throw new ReferenceError('emit: No such ref ' + type) }
        const method = ref[capitalize(target, 'on')];
        if (!method) { throw new ReferenceError('emit ' + type + ': No such method ' + capitalize(target, 'on')) }
        const result = method.call(ref, event, ref);
        console.log(type + ':' + capitalize(target, 'on'), result, event, ref)
        const up = r => racer(() => ref.$.up(r))
        result && result.then ? result.then(up, error => up({ error })) : up(result);
      } catch (ex) {
        console.error('emit ' + type + ':' + target, ex)
        send({ error: ex });
      }
    } else {
      this.actualOwner.up(data)
    }
  }

}
