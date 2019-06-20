import { parseXML } from './xml.js';
import { compileNode } from './compile.js';
import { fnName } from './utils.js';

const REGISTRY = new Map();
const CACHE = {};

const reg = ctr => {
    const ctor = typeof ctr === 'function' ? ctr : Object.assign(function () { }, ctr);
    const name = ctor.NAME = ctor.NAME || ctor.name || fnName(ctor);
    const text = ctor.TEMPLATE || ctor.prototype.TEMPLATE;

    ctor.$TEMPLATE = () => CACHE[name] || (CACHE[name] = compileNode(parseXML(text, name)));

    return REGISTRY.set(name, ctor);
};

export const typeByTag = tag => REGISTRY.get(tag);

export const registerTypes = (...types) => {
    reg({ NAME: 'fragment', TEMPLATE: '<ui:slot/>' });
    types.forEach(reg);
    return new Map([[0, { tag: types[0].NAME, props: {} }]]);
};
