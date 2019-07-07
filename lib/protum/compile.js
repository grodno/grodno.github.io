import { expression, filterMapKey, VALUES } from './utils.js';

const makeApplicator = (get, k = '_') => (c, acc) => {
  if (get) {
    const val = get(c);
    if (k.slice(0, 5) === 'data-') {
      acc['data'] = { ...acc['data'], [k.slice(5)]: val in VALUES ? VALUES[val] : val };
    } else {
      acc[k] = val;
    }
  }
};
const emitter = (v, fctr = expression(v)) => c => (data, opts) => c.emit(fctr(c), data, opts);
const hasSlot = (c, key) => {
  let r = false;
  c.content.forEach(e => { r = r || (e.tag === c.tag + ':' + key); });
  return r;
};
export function compileEach([itemId, , expr], { tag, attrs, uid, nodes }) {
  const $each = { itemId };
  const r = { tag: 'ui:fragment', uid: 'each:' + expr + uid, $each, key: attrs.get('key') };
  if ((expr.slice(0, 2) === '<-')) {
    const pipes = expr.slice(2).split('|').map(s => s.trim());
    const key = pipes.shift();
    const fn = !pipes.length ?
      c => c.connect(key, rr => ({ $data: rr })) :
      c => c.connect(key, rr => ({ $data: pipes.reduce((acc, pk) => c.pipe(pk, acc), rr) }));
    (r.inits || (r.inits = [])).push(fn);
  } else {
    (r.updates || (r.updates = [])).push(makeApplicator(expression('{:'.includes(expr[0]) ? expr : '{{' + expr + '}}'), '$data'));
  }
  let $nodes = nodes;
  if (nodes && nodes.length) {
    const emptyNode = $nodes.find(e => e.tag === 'ui:empty');
    if (emptyNode) {
      $each.emptyNode = emptyNode.nodes.map(compileNode);
      $nodes = $nodes.filter(e => e !== emptyNode);
    }
    const loadingNode = $nodes.find(e => e.tag === 'ui:loading');
    if (loadingNode) {
      $each.loadingNode = loadingNode.nodes.map(compileNode);
      $nodes = $nodes.filter(e => e !== loadingNode);
    }
  }
  $each.itemNode = compileNode({ tag, attrs, uid, nodes: $nodes });
  return r;
}

export function compileIf(aIf, { tag, attrs, uid, nodes }) {
  const iff = {};
  const r = {
    tag: 'ui:fragment',
    uid: 'if:' + aIf + uid,
    key: attrs.get('key'), $if: iff,
  };
  const neg = aIf[0] === '!';
  const expr = neg ? aIf.slice(1) : aIf;

  if ((expr.slice(0, 2) === '<-')) {
    (r.inits || (r.inits = [])).push(c => c.connect(expr.slice(2).trim(), neg ? (rr => ({ $data: !rr })) : (rr => ({ $data: (!!rr) }))));
  } else if ((expr.slice(0, 5) === 'slot:')) {
    const gttr = c => hasSlot(c, expr.slice(5));
    (r.updates || (r.updates = [])).push((c, acc) => { acc['$data'] = neg ? !gttr(c) : gttr(c); });
  } else {
    const gttr = expression('{:'.includes(expr[0]) ? expr : '{{' + expr + '}}');
    (r.updates || (r.updates = [])).push((c, acc) => { acc['$data'] = neg ? !gttr(c) : gttr(c); });
  }
  let $nodes = null;
  if (nodes && nodes.length) {
    const ifElse = nodes.find(e => e.tag === 'ui:else');
    const ifThen = nodes.find(e => e.tag === 'ui:then');
    if (ifElse) {
      iff.else = ifElse.nodes.map(compileNode);
      $nodes = ifThen ? ifThen.nodes : [{ tag, attrs, uid, nodes: nodes.filter(e => e !== ifElse) }];
    } else if (ifThen) {
      $nodes = [{ tag, attrs, uid, nodes: ifThen.nodes }];
    }
  }
  iff.then = ($nodes || [{ tag, attrs, uid, nodes }]).map(compileNode);
  return r;
}

export function compileNode({ tag, attrs, uid, nodes }) {

  // ui:each
  const each = attrs.get('ui:each');
  if (each) {
    return compileEach(each.split(' '), { tag, attrs: filterMapKey(attrs, 'ui:each'), uid, nodes });
  }

  // ui:if
  const aIf = attrs.get('ui:if');
  if (aIf) {
    return compileIf(aIf, { tag, attrs: filterMapKey(attrs, 'ui:if'), uid, nodes });
  }

  const r = { tag, uid, id: attrs.get('id'), ref: attrs.get('ui:ref') };
  // attrs
  attrs.forEach((v, k) => {
    if (k.slice(0, 3) !== 'ui:') {
      const v2 = v.slice(0, 2)
      // console.log('compileAttrs', k, v);
      if (v2 === '<-') {
        (r.inits || (r.inits = [])).push(c => c.connect(v.slice(2).trim(), rr => ({ [k]: rr })));
      } else if (v2 === '->') {
        (r.updates || (r.updates = [])).push(makeApplicator(emitter(v.slice(2).trim()), k));
      } else {
        if (!v.includes('{{') && v[0] !== ':') {
          (r.initials || (r.initials = {}))[k] = v;
        } else {
          (r.updates || (r.updates = [])).push(makeApplicator(expression(v), k));
        }
      }
    }
  });
  // ui:props
  let aProps = attrs.get('ui:props');
  if (aProps) {
    if ((aProps.slice(0, 2) === '<-')) {
      (r.inits || (r.inits = [])).push(c => c.connect(aProps.slice(2).trim(), rr => rr));
    } else {
      const get = expression(aProps);
      (r.updates || (r.updates = [])).push((c, acc) => Object.assign(acc, get(c)));
    }
  }
  r.nodes = nodes.map(compileNode);
  return r;
}

