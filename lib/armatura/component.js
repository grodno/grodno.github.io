import { render } from './render.js';
import { capitalize, humanize, nextId, runInBrowser, lastTail } from './utils.js';
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
      this.impl = new Ctor(props, this);
      this.impl.$ = this;
    } else {
      this.api = this.impl = new Ctor(options);
    }
    if (ref) {
      const hidden = this.api[ref]
      this.api[ref] = this.impl;
      this.defer(() => { this.api[ref] = hidden })
    }
  }

  /**
   * Rendering.
   */
  resolveFragmentTemplate() {
    const acc = new Map();

    if (this.$for) { // ui:for
      const $for = this.$for;
      const { $data: data } = this.impl;
      const { itemId, itemNode, emptyNode, loadingNode } = $for;
      const { tag, updates, initials = {}, nodes, uid } = itemNode;
      if (data && data.length) {
        if (!data.forEach) {
          throw new Error('wrong ui:for data', data)
        }
        data.forEach((d, index) => {
          const id = `${uid}-$${d.id || index}`;
          const $ownerImpl = Object.assign(Object.create(this.owner.impl), { [itemId]: d, [itemId + 'Index']: index })
          const $owner = Object.assign(Object.create(this.owner), { impl: $ownerImpl, $propFnMap: {} })
          resolveTemplate($owner, { tag, initials, updates, nodes, uid: id }, acc);
        });
      } else if (!data) {
        if (loadingNode) { resolveTemplate(this.owner, loadingNode, acc); }
      } else if (!data.length) {
        if (emptyNode) { resolveTemplate(this.owner, emptyNode, acc); }
      }

    } else if (this.$if) { // ui:if
      const $if = this.$if;
      const { $data } = this.impl;
      const node = $data ? $if.then : $if.else;
      resolveTemplate(this, node, acc);

    } else if (this.$tag) { // ui:tag
      const tag = this.impl.$data;
      if (tag) {
        resolveTemplate(this, { ...this.$tag, tag, uid: tag + ':' + this.uid }, acc);
      }

    } else if (this.content) { // content
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
    return (this.tag === 'ui:fragment')
      ? this.resolveFragmentTemplate()
      : resolveTemplate(this, this.impl.constructor.$TEMPLATE())
  }

  /**
   * Life-cycle hooks.
   */
  init() {
    if (this.isDone || this.isInited) { return; }
    this.isInited = true;
    // console.log('init', this.tag, this.uid)
    if (this.inits) {
      this.inits.forEach(f => this.defer(f(this)));
      delete this.inits;
    }
    if (this.impl.init) {
      const d = this.impl.init(this)
      if (d) { this.up(d); }
    }

  }
  done() {
    if (this.isDone) { return; }
    this.isDone = true;
    if (this.impl.done) {
      this.impl.done(this);
    }
    // console.log('done', this.tag, this.uid)
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
    this.cleanUp();
  }

  /**
   * Properties.
   */
  up(Δ) {
    if (this.isDone) { return; }
    let changed = this.set(Δ);
    // (this.parent.rendering ? this : this.parent).render();
    this.render();
    if (this.ref && changed) { this.notify(); }
  }

  upAsync(promise, key) {
    const $ = this;
    const racer = $.raceCondition('set:' + (key || 'up'));
    const up = r => racer(() => $.up(r))
    if (key) {
      const akey = key.replace('Promise', '')
      promise.then(val => up({ [akey + 'Error']: null, [akey]: val }), error => up({ [akey + 'Error']: error }));

    } else {
      promise.then(up, error => up({ error }));
    }
    return promise;
  }

  set(Δ) {
    const $ = this;
    const impl = $.impl;
    let changed = false;
    if (impl.set) {
      changed = impl.set(Δ);
    } else if (Δ) {
      if (Δ.then) {
        $.upAsync(Δ);
      } else {
        Object.entries(Δ).forEach(([k, their]) => {
          if (their && their.then) {
            $.upAsync(their, k);
          } else if (typeof their !== 'undefined' && their !== impl[k]) {
            const setter = impl['set' + k[0].toUpperCase() + k.slice(1)];
            if (setter) { setter.call(impl, their); } else { impl[k] = their; }
            changed = true;
          }
        });
      }
    }
    return changed;
  }

  prop(propId) {
    const value = this.propGetter(propId)();
    return (typeof value === 'function') ? this.bindFn(value) : value;
  }

  propGetter(key) {
    const $ = this;
    const map = $.$propFnMap || ($.$propFnMap = {});
    let fn = map[key];
    if (fn) { return fn; }

    const impl = this.impl
    const [pk, ...path] = key.split('.')
    const gettr = impl[capitalize(pk, 'get')];

    const extractor1 = gettr
      ? () => gettr.call(impl, $)
      : ($$ = impl.get ? impl.get() : impl) =>
        ((pk in $$) ? $$[pk] : $.owner && $.owner.prop && $.tag === 'ui:fragment' ? $.owner.prop(pk) : undefined);

    fn = !path.length
      ? extractor1
      : () => path.reduce((r, p) => (r ? r[p] : r), extractor1())

    return map[key] = fn;
  }

  string(key) {
    return this.resource(key) || humanize(lastTail(key))
  }

  resource(key) {
    try {
      return this.api.resources(key);
    } catch (ex) {
      console.error('resource', ex)
      return null;
    }
  }

  pipe(value, key) {
    try {
      const [id, ...args] = key.split(':')
      const fn = this.api.pipes[id];
      return fn ? fn.apply(this.impl, [value, ...args]) : value;
    } catch (ex) {
      console.error('pipe', ex)
      return value;
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
    const ref = type === 'this' ? this.impl : this.api[type];
    if (!ref) { console.error('connect: No such ref ' + type, key) }
    return ref && ref.$.subscribe(() => {
      try {
        const racer = this.raceCondition(type + ':load:' + target);
        const callback = (error, r) => racer(() => {
          if (error) { this.error('connect error', error) }
          this.up({
            error, ...(applicator ? applicator(r) : r)
          })
        });
        const result = ref.$.prop(target);
        result && result.then ? result.then(r => callback(null, r), callback) : callback(null, result);
      } catch (ex) {
        console.error('connect ' + type + ':' + target, ex)
        this.up({ [type + 'Error']: ex });
      }
    });
  }

  emit(key, data, callback) {
    if (!key) {
      this.actualOwner.up(data)
      return
    }
    const event = urlParse(key, { data });
    const { type, target } = event;
    if (!type) {
      this.actualOwner.up({ [target]: data })
      return
    }
    const racer = this.raceCondition(type + ':on:' + target);
    event.callback = (error, r) => racer(() => callback ? callback(error, r) : this.up({ error, ...r }))
    const ref = type === 'this' ? this.impl : this.api[type];
    try {
      if (!ref) { throw new ReferenceError('emit: No such ref ' + type) }
      const method = ref[capitalize(target, 'on')];
      if (!method) { throw new ReferenceError('emit ' + type + ': No such method ' + capitalize(target, 'on')) }
      const result = method.call(ref, event, ref);
      this.log(type + ':' + capitalize(target, 'on'), result, event, ref)
      if (result) {
        ref.$.up(result)
      }
    } catch (ex) {
      this.error('emit ' + type + ':' + target, ex)
      event.callback(ex);
    }
  }

  /**
   * Routines.
   */

  raceCondition(key) {
    const COUNTERS = this.$weak || (this.$weak = new Map())
    const counter = 1 + (COUNTERS.get(key) || 0);
    COUNTERS.set(key, counter)
    return (fn) => {
      if (counter === COUNTERS.get(key)) { runInBrowser(fn) };
    }
  }

  defer(fn) { if (fn && typeof fn === 'function') { (this.defered || (this.defered = [])).push(fn); } }

  eachChild(fn, ch = this.children) { if (ch) { ch.forEach(fn); } }

  get actualOwner() {
    let $ = this
    for (; $.owner && $.tag === 'ui:fragment'; $ = $.owner) { }
    return $
  }

  cleanUp() {
    ['parent', 'children', 'owner', 'impl', 'app', 'ctx'].forEach(k => { delete this[k]; });
  }

  error(...args) {
    console.error(this.tag + this.uid, ...args)
  }

  log(...args) {
    console.log(this.tag + this.uid, ...args)
  }

  bindFn(f) {
    const $ = this;
    const map = $.$boundFnMap || ($.$boundFnMap = new Map());
    let fn = map.get(f);
    if (!fn) {
      const bound = f.bind($.impl);
      fn = (...args) => {
        const r = bound(...args);
        if (r) {
          $.up(r)
        }
      }
      map.set(f, fn);
    }
    return fn;
  }

}
