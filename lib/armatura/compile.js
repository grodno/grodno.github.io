import { expression, filterMapKey, VALUES } from './utils.js';

const assigner = (acc, val, k) => {
  if (k.slice(0, 5) === 'data-') {
    acc['data'] = { ...acc['data'], [k.slice(5)]: val in VALUES ? VALUES[val] : val };
  } else {
    acc[k] = val;
  }
}

const makeApplicator = (get, k = '_') => (c, acc) => assigner(acc, get(c), k);
const emitter = (v, k, fctr = expression(v)) => c => c['$' + k] || (c['$' + k] = (data, opts) => c.emit(fctr(c), data, opts));
const hasSlot = (c, key) => c.content.reduce((r, e) => r || (e.tag === c.tag + ':' + key), false);
export function compileEach({ tag, attrs, uid, nodes }) {
  const [itemId, , expr] = attrs.get('ui:each').split(' ');
  const $each = { itemId };
  const r = { tag: 'ui:fragment', uid: 'each:' + expr + uid, $each, key: attrs.get('key') };
  if ((expr.slice(0, 2) === '<-')) {
    const pipes = expr.slice(2).split('|').map(s => s.trim());
    const key = pipes.shift();
    const fn = !pipes.length ?
      c => c.connect(key, rr => ({ $data: rr })) :
      c => c.connect(key, rr => ({ $data: pipes.reduce((acc, pk) => c.reduce(acc, pk), rr) }));
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
  $each.itemNode = compileNode({ tag, attrs: filterMapKey(attrs, 'ui:each'), uid, nodes: $nodes });
  return r;
}

export function compileIf({ tag, attrs, uid, nodes }) {
  const aIf = attrs.get('ui:if')
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
  let $then = { tag, attrs: filterMapKey(attrs, 'ui:if'), uid, nodes };
  if (nodes && nodes.length) {
    const ifElse = nodes.find(e => e.tag === 'ui:else');
    const ifThen = nodes.find(e => e.tag === 'ui:then');
    if (ifElse) {
      iff.else = ifElse.nodes.map(compileNode);
      $then.nodes = ifThen ? ifThen.nodes : nodes.filter(e => e !== ifElse);
    } else if (ifThen) {
      $then.nodes = ifThen.nodes;
    }
  }
  iff.then = [$then].map(compileNode);
  return r;
}

export function compile(r) {
  const { attrs, nodes } = r;
  if (attrs.has('id')) { r.id = attrs.get('id') }
  if (attrs.has('ui:ref')) { r.ref = attrs.get('ui:ref') }
  // ui:props
  if (attrs.has('ui:props')) {
    const aProps = attrs.get('ui:props');
    if ((aProps.slice(0, 2) === '<-')) {
      (r.inits || (r.inits = [])).push(c => c.connect(aProps.slice(2).trim(), rr => rr));
    } else {
      const getter = expression(aProps);
      (r.updates || (r.updates = [])).push((c, acc) => Object.assign(acc, getter(c)));
    }
  }
  // attrs
  attrs.forEach((v, k) => {
    if (k.slice(0, 3) !== 'ui:') {
      const v2 = v.slice(0, 2)
      if (v2 === '<-') {
        (r.inits || (r.inits = [])).push(c => c.connect(v.slice(2).trim(), rr => ({ [k]: rr })));
      } else if (v2 === '->') {
        (r.updates || (r.updates = [])).push(makeApplicator(emitter(v.slice(2).trim(), k), k));
      } else {
        if (!v.includes('{{') && v[0] !== ':') {
          assigner((r.initials || (r.initials = {})), v, k);
        } else {
          (r.updates || (r.updates = [])).push(makeApplicator(expression(v), k));
        }
      }
    }
  });

  r.nodes = nodes.map(compileNode)

  return r;
}

export function compileNode(node) {
  if (node.attrs.has('ui:each')) { return compileEach(node); }
  if (node.attrs.has('ui:if')) { return compileIf(node); }
  return compile(node);
}

