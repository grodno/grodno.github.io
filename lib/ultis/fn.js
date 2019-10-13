const undef = Object.undefined;
let COUNTER = 1;

export const nope = () => { };
export const fnId = x => x;
export const fnNull = x => null;
export const fnTrue = () => true;
export const fnFalse = () => false;

export const nextId = (p = '') => p + (COUNTER++);

const _curry = (fn, args0, lengthLimit) => {
  const fx = (args) => args.length >= lengthLimit ?
    fn(...args) :
    _curry(fn, args, lengthLimit - args.length);

  return (...args) => fx([...args0, ...args]);
};

export const curry = (f, ...args) => _curry(f, args, f.length);

export const compose = (...ff) => x0 => ff.reduceRight((x, f) => f(x), x0);

export const swap = f => (a, b) => f(b, a);

export const isSomething = (a) => a !== undef && a !== null;
export const someOrNull = (a) => a === undef || a === null ? null : a;

export const assert = (b, error, errorType) => b || fnThrow(error, errorType);
