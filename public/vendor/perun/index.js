import { Component } from './component.js';
import { registerTypes } from './register.js';
import { render } from './render.js';
import { runInBrowser } from './utils.js';

export default function (...types) {
  registerTypes(...types);
  const meta = new Map([[0, { tag: types[0].NAME }]]);
  return {
    run(Api, ctx) {
      const boot = new Component(Api || function () { }, {});
      runInBrowser((doc) => render(boot, meta, ctx || doc.getElementById('app') || doc.body));
    }
  };
}
