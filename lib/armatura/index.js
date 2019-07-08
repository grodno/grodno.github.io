import { Component } from './component.js';
import { registerTypes, reset } from './register.js';
import { render } from './render.js';
import { runInBrowser } from './utils.js';
import { Api } from './api.js';

export function register(...types) {
  registerTypes(...types);
  const meta = new Map([[0, { tag: types[0].NAME }]]);
  return {
    run(TheApi, ctx) {
      const root = new Component(TheApi || Api, {});
      const renderBoot = (met = new Map()) => (doc) => render(root, met, ctx || doc.body);
      runInBrowser(renderBoot(meta));
      // returns with reset funct
      return () => { runInBrowser(renderBoot()); root.done(); reset(); };
    }
  };
}
