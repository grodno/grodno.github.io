import { Component } from './component.js';
import { registerTypes } from './register.js';
import { runInBrowser } from './utils.js';
import { DomElement } from './dom.js';

class WebClientAppStub {
  constructor(props, $) {
    Object.assign(this, props);
    $.elt = $.ctx = $.rootElement || document.body;
  }
  render($, render) {
    runInBrowser(() => render($))
  }
}

export function register(...types) {
  return {
    run({ rootElement, template, App = WebClientAppStub, Element = DomElement, ...props } = {}) {
      Component.Element = Element
      App.TEMPLATE = template || App.TEMPLATE || `<${types[0].NAME}/>`;
      registerTypes(App, ...types)
      const options = { props, rootElement };
      const app = new Component(App, options);
      app.render();
      app.init();
      return app.impl;
    }
  };
}
