import { Component } from './component.js';
import { registerTypes } from './register.js';
import { render } from './render.js';
import { runInBrowser } from './utils.js';

class ApiStub {
  constructor(props) {
    Object.assign(this, props);
  }
  render($) {
    runInBrowser(() => {
      render($, $.meta);
      $.ctx.appendChild($.elt)
    })
  }
}

export function register(...types) {
  registerTypes(...types);
  const meta = new Map([[0, { tag: types[0].NAME }]]);
  return {
    run({ pipes, resources, rootElement = document.body, Api = ApiStub }) {
      const options = {
        props: { pipes, resources },
        meta,
        ctx: rootElement,
        elt: document.createDocumentFragment()
      };
      const root = new Component(Api, options);
      root.render();
      return () => { root.done(); registerTypes.reset(); };
    }
  };
}
