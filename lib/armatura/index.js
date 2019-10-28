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

export function register(...args) {
  return {
    run({ rootElement, template, App = WebClientAppStub, Element = DomElement, ...props } = {}) {
      const types = [App].concat(...args)
      Component.Element = Element
      App.template = template || App.TEMPLATE || `<${types[1].name || types[1].NAME}/>`;
      registerTypes(types)
      const options = { props, rootElement };
      const app = new Component(App, options);
      app.render();
      app.init();
      return app.impl;
    }
  };
}
