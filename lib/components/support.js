export const fromJS = o => Object.keys(o).map(name => typeof o[name] === 'function' ? o[name] : { NAME: name, TEMPLATE: o[name] });

export const fromTemplates = (...list) => list
  .map(key => document.getElementById(String.capitalize(key) + 'Template'))
  .map(top => [...top.import.body.children].map(e => ({ NAME: e.getAttribute('id'), TEMPLATE: e.innerHTML })))
  .reduce((r, e) => r.concat(e), []);

export const loadTemplates = (...args) => {
  const R = [];
  args.forEach(s => s.replace(/<template\sid="(.+)"\>([\s\S]*?)<\/template>/gm, (_, id, templ) => R.push({ NAME: id, TEMPLATE: templ })));
  return R;
}

export class AService {
  constructor(props, $) {
    Object.assign(this, props, {
      app: $.app,
      ref: $.ref,
      emit: (...args) => $.emit(...args),
      log: (...args) => console.log($.ref + ': ', ...args),
      error: (error) => console.error($.ref + ': ', error)
    });
  }
}

export class Logger {
  init() {
    console.log('this --------> ', this.message)
  }
}
export class Delay {
  init() {
    setTimeout(() => this.action(this.data), (this.period || 5) * 1000)
  }
}
export class Invoke {
  init() {
    this.action(this.data)
  }
}
export class Loader {

  init() {
    this.reload()
  }

  setTrigger(val) {
    this.trigger = val
    this.reload()
  }

  reload() {
    const { from, data, into } = this;
    if (from && into) {
      from(data, (error, result) => into({ error, ...result }))
    }
  }
}
