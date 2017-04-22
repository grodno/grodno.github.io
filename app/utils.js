import { Component as Widget } from 'ui';

const RE_PLACEHOLDER = /(:|if="|\{\{)([a-zA-Z0-9\._$]+)(\}\}|"|\s)/g;

export const TEMPLATE = `<span class="{{class}}" title="{{text}}">{{text}}</span>`;

export const DEFAULT_PROPS = {
  value: {},
  data: {}
};

export const registerWidgetType = (...types) => {

  types.forEach(type => {

    if (!type.hasOwnProperty('PROPS')) {
      type.PROPS = { ...DEFAULT_PROPS };
    }

    type.TEMPLATE.replace(RE_PLACEHOLDER, (s, _, _key) => {

      const key = _key.split('.')[0];
      if ( !type.PROPS[key] && !(type.prototype.__lookupGetter__(key)) && !type.prototype[key]) {
        type.PROPS[key] = {};
      }
    });

    Widget.registerType(type);

  });
};

export const createWidgetType = (name, template = name, SuperType = Widget) => {

  const props = { ...(SuperType.PROPS || DEFAULT_PROPS) };

  class $Widget extends SuperType {
    static NAME = name;
    static TEMPLATE = template;
    static PROPS = props;
  }

  Object.defineProperty($Widget, 'name', { value: name });

  registerWidgetType($Widget);

  return $Widget;
};
