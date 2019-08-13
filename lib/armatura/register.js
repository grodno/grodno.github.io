import { parseXML } from './xml.js';
import { compileNode } from './compile.js';
import { fnName } from './utils.js';

const REGISTRY = new Map();
const CACHE = {};
const reg = ctr => {
    const ctor = typeof ctr === 'function' ? ctr : Object.assign(function () { }, ctr);
    const name = ctor.NAME = ctor.NAME || ctor.name || fnName(ctor);
    const text = ctor.TEMPLATE || ctor.prototype.TEMPLATE;
    ctor.$TEMPLATE = () => CACHE[name] || (CACHE[name] = text ? compileNode(parseXML(typeof text === 'function' ? text() : text, name)) : []);
    REGISTRY.set(name, ctor);
};

reg({ NAME: 'ui:fragment' });

export const registerTypes = (...types) => types.forEach(reg);

registerTypes.reset = () => Object.keys(CACHE).forEach(k => { delete CACHE[k]; });
registerTypes.getByTag = REGISTRY.get.bind(REGISTRY);