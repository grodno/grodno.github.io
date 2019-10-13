import { VALUES } from './utils.js';

const RE_SINGLE_PLACEHOLDER = /^\{([a-zA-Z0-9.:_$|]+)\}$/;
const RE_PLACEHOLDER = /\{([a-zA-Z0-9.:_$|]+)\}/g;

// Compilation
export function expression(v) {
  if (v[0] === ':') { return placeholder(v); }
  if (!v.includes('{')) { const r = v in VALUES ? VALUES[v] : v; return () => r; }
  if (v.match(RE_SINGLE_PLACEHOLDER)) { return placeholder(v.slice(1, -1).trim()); }
  return stringInterpolation(v);
}

export function stringInterpolation(v, fnx = []) {
  const pattern = v.replace(RE_PLACEHOLDER, (s, expr) => { fnx.push(placeholder(expr)); return '{{' + (fnx.length - 1) + '}}'; });
  return c => !fnx.length ? pattern : pattern.replace(/\{\{(\d+)\}\}/g, (s, idx) => {
    const r = fnx[idx](c);
    return !r && r !== 0 ? '' : r;
  });
}

export function placeholder(expr) {
  return representWithPipes(expr, (key) => (key[0] === ':') ? (fn => c => c.pipe(fn(c), 'R'))(stringInterpolation(key.slice(1).trim())) : c => c.prop(key));
}

export function representWithPipes(expr, fn) {
  const pipes = expr.split('|').map(s => s.trim());
  const key = pipes.shift();
  const initial = fn(key);
  return !pipes.length ? initial : c => pipes.reduce((r, pk) => c.pipe(r, pk), initial(c));
}

const assigner = (acc, val, k) => {
  if (k.slice(0, 5) === 'data-') {
    acc['data'] = { ...acc['data'], [k.slice(5)]: val in VALUES ? VALUES[val] : val };
  } else {
    acc[k] = val;
  }
}

const makeApplicator = (get, k = '_') => (c, acc) => assigner(acc, get(c), k);
const emitter = (v, k, fctr = expression(v)) => c => c['$' + k] || (c['$' + k] = (data, cb) => c.emit(fctr(c), data, cb));
const hasSlot = (c, id) => {
  let r = false;
  if (id && id != 'default') {
    c.content && c.content.forEach((e) => { r = r || (e.tag === c.tag + ':' + id) });
  } else {
    c.content && c.content.forEach((e) => { r = r || (e.tag.slice(0, c.tag.length + 1) !== c.tag + ':') });
  }
  return r
}

export const filterMapKey = (src, key) => {
  const r = new Map();
  src.forEach((v, k) => { if (k !== key) { r.set(k, v); } });
  return r;
};

export function compileFor({ tag, attrs, uid, nodes }) {
  const [itemId, , expr] = attrs.get('ui:for').split(' ');
  const $for = { itemId };
  const r = { tag: 'ui:fragment', uid: 'for:' + expr + uid, $for, key: attrs.get('key') };
  if ((expr.slice(0, 2) === '<-')) {
    const pipes = expr.slice(2).split('|').map(s => s.trim());
    const key = pipes.shift();
    const fn = !pipes.length ?
      c => c.connect(key, rr => ({ $data: rr })) :
      c => c.connect(key, rr => ({ $data: pipes.reduce((acc, pk) => c.reduce(acc, pk), rr) }));
    (r.inits || (r.inits = [])).push(fn);
  } else {
    (r.updates || (r.updates = [])).push(makeApplicator(expression('{:'.includes(expr[0]) ? expr : '{' + expr + '}'), '$data'));
  }
  let $nodes = nodes;
  if (nodes && nodes.length) {
    const emptyNode = $nodes.find(e => e.tag === 'ui:empty');
    if (emptyNode) {
      $for.emptyNode = emptyNode.nodes.map(compileNode);
      $nodes = $nodes.filter(e => e !== emptyNode);
    }
    const loadingNode = $nodes.find(e => e.tag === 'ui:loading');
    if (loadingNode) {
      $for.loadingNode = loadingNode.nodes.map(compileNode);
      $nodes = $nodes.filter(e => e !== loadingNode);
    }
  }
  $for.itemNode = compileNode({ tag, attrs: filterMapKey(attrs, 'ui:for'), uid, nodes: $nodes });
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
  } else if ((expr.slice(0, 5) === 'slot(')) {
    const gttr = c => hasSlot(c, expr.slice(5, -1));
    (r.updates || (r.updates = [])).push((c, acc) => { acc['$data'] = neg ? !gttr(c) : gttr(c); });
  } else {
    const gttr = expression(expr.includes('{') ? expr : '{' + expr + '}');
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

export function compileTag({ attrs, uid, nodes }) {
  const expr = attrs.get('tag')
  const r = {
    tag: 'ui:fragment',
    uid: 'tag:' + expr + uid,
    $tag: compile({ attrs: filterMapKey(attrs, 'tag'), nodes }),
  };
  if ((expr.slice(0, 2) === '<-')) {
    (r.inits || (r.inits = [])).push(c => c.connect(expr.slice(2).trim(), (rr => ({ $data: rr }))));
  } else {
    const gttr = expression(expr);
    (r.updates || (r.updates = [])).push((c, acc) => { acc['$data'] = gttr(c); });
  }
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
      const val = aProps.slice(2).trim();
      (r.inits || (r.inits = [])).push(c => c.connect(val, rr => rr));
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
        const expr = expression(v.slice(2).trim());
        (r.inits || (r.inits = [])).push(c => c.connect(expr(c), rr => ({ [k]: rr })));
      } else if (v2 === '->') {
        (r.updates || (r.updates = [])).push(makeApplicator(emitter(v.slice(2).trim(), k + ':emitter:' + r.uid), k));
      } else {
        if (!v.includes('{') && v[0] !== ':') {
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
  if (node.attrs.has('ui:for')) { return compileFor(node); }
  if (node.attrs.has('ui:if')) { return compileIf(node); }
  if (node.tag === 'ui:tag') { return compileTag(node); }
  return compile(node);
}

