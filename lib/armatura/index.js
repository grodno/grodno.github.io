import { Component } from './component.js';
import { registerTypes } from './register.js';
import { render } from './render.js';
import { runInBrowser } from './utils.js';

class Api {
  constructor(options) {
    Object.assign(this, options)
  }
}

export function register(...types) {
  registerTypes(...types);
  const meta = new Map([[0, { tag: types[0].NAME }]]);
  return {
    run({ pipes, resources, rootElement }) {
      const root = new Component(Api, { pipes, resources });
      root.render = () => runInBrowser((doc) => render(root, meta, rootElement || doc.body));
      root.render();
      return () => { root.done(); registerTypes.reset(); };
    }
  };
}
