import { parseXML } from 'furnitura';
import { compileNode } from './compile.js';
import { fnName } from './utils.js';

const REGISTRY = new Map();
const CACHE = {};
const reg = ctr => {
    const ctor = typeof ctr === 'function' ? ctr : Object.assign(function () { }, ctr);
    const name = ctor.NAME = ctor.NAME || ctor.name || fnName(ctor);
    const text = ctor.TEMPLATE || ctor.prototype.TEMPLATE;
    ctor.$TEMPLATE = () => CACHE[name] || (CACHE[name] = text ? compileNode(parseXML(text, name)) : []);
    REGISTRY.set(name, ctor);
};
reg({ NAME: 'ui:fragment' });
export const typeByTag = REGISTRY.get.bind(REGISTRY);
export const registerTypes = (...types) => types.forEach(reg);
export const reset = () => Object.keys(CACHE).forEach(k => { delete CACHE[k]; });