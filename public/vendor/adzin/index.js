import { Component } from './component.js';
import { registerTypes, reset } from './register.js';
import { render } from './render.js';
import { runInBrowser } from './utils.js';

export default function (...types) {
  registerTypes(...types);
  const meta = new Map([[0, { tag: types[0].NAME }]]);
  return {
    run(Api, ctx) {
      const boot = new Component(Api || function () { }, {});
      const renderBoot = (met = new Map()) => (doc) => render(boot, met, ctx || doc.getElementById('app') || doc.body);
      runInBrowser(renderBoot(meta));
      return () => { runInBrowser(renderBoot()); boot.done(); reset(); };
    }
  };
}
