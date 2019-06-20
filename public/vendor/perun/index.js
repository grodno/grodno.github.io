import { Component } from './component.js';
import { registerTypes } from './register.js';
import { render } from './render.js';
import { runInBrowser } from './utils.js';

export default function (...types) {
  const meta = registerTypes(...types);
  return {
    run(Api, ctx) {
      const boot = new Component(Api || function () { }, {});
      runInBrowser((doc) => render(boot, meta, ctx || doc.getElementById('app') || doc.body));
    }
  };
}
