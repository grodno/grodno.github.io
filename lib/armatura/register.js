import { parseXML } from './xml.js';
import { compileNode } from './compile.js';
import { fnName } from './utils.js';

const REGISTRY = new Map();

const reg = ctr => {
    const ctor = typeof ctr === 'function' ? ctr : Object.assign(function () { }, ctr);
    const name = ctor.NAME || ctor.name || fnName(ctor);
    const text = ctor.TEMPLATE || ctor.prototype.TEMPLATE;
    ctor.$TEMPLATE = () => {
        try {
            const T = text ? compileNode(parseXML(typeof text === 'function' ? text() : text, name)) : [];
            ctor.$TEMPLATE = () => T;
            return T;
        } catch (ex) {
            console.log('compile ' + name, ex)
        }
        return []
    }
    REGISTRY.set(name, ctor);
};

reg({ NAME: 'ui:fragment' });

export const registerTypes = (...types) => types.forEach(reg);

registerTypes.getByTag = REGISTRY.get.bind(REGISTRY);