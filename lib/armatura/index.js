import { Component } from './component.js';
import { registerTypes, reset } from './register.js';
import { render } from './render.js';
import { runInBrowser } from './utils.js';
import { Api } from './api.js';

export default function (...types) {
  registerTypes(...types);
  const meta = new Map([[0, { tag: types[0].NAME }]]);
  return {
    run(TheApi, ctx) {
      const boot = new Component(TheApi || Api, {});
      const renderBoot = (met = new Map()) => (doc) => render(boot, met, ctx || doc.getElementById('app') || doc.body);
      runInBrowser(renderBoot(meta));
      // returns with reset func
      return () => { runInBrowser(renderBoot()); boot.done(); reset(); };
    }
  };
}
