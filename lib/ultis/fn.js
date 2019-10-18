const undef = Object.undefined;
let COUNTER = 1;

export const nope = Function.NOPE = () => { };
export const fnId = Function.ID = x => x;
export const fnNull = Function.NULL = () => null;
export const fnTrue = Function.TRUE = () => true;
export const fnFalse = Function.FALSE = () => false;
export const nextId = Function.nextId = (p = '') => p + (COUNTER++);

export const fnThrow = Function.throw = (error, ErrorType = Error) => {
  throw typeof error === 'string' ? new ErrorType(error) : error;
}
export const assert = Function.assert = (b, error, errorType) => b || fnThrow(error, errorType);

export const compose = Function.compose = (...ff) => x0 => ff.reduceRight((x, f) => f(x), x0);
export const swap = Function.swap = f => (a, b) => f(b, a);
export const curry = Function.curry = (() => {

  const _curry = (fn, args0, lengthLimit) => {
    const fx = (args) => args.length >= lengthLimit ?
      fn(...args) :
      _curry(fn, args, lengthLimit - args.length);

    return (...args) => fx([...args0, ...args]);
  };

  return (f, ...args) => _curry(f, args, f.length);
})()

