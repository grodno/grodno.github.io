import { Component } from './component.js';
import { registerTypes } from './register.js';
import { render } from './render.js';
import { runInBrowser } from './utils.js';
import { Api } from './api.js';

export * from './api.js';
export * from './url.js';

export function register(...types) {
  registerTypes(...types);
  const meta = new Map([[0, { tag: types[0].NAME }]]);
  return {
    run(ctx) {
      const root = new Component(Api, {});
      root.render = () => runInBrowser((doc) => render(root, meta, ctx || doc.body));
      root.render();
      return () => { root.done(); registerTypes.reset(); };
    }
  };
}
