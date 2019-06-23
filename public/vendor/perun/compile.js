import { expression } from './utils.js';

const makeApplicator = (get, k = '_') => (c, acc) => { if (get) { acc[k] = get(c); } };
const dType = dt => (dt === 'fragment' || dt === 'slot') ? (() => dt) : (c => c.prop(dt));
const compileType = tag => tag.slice(0, 3) === 'ui:' ? dType(tag.slice(3)) : () => tag;
const emitter = (v, fctr = expression(v)) => c => (data, opts) => c.emit(fctr(c), data, opts);

export function compileEach([itemId, , expr], { tag, attrs, uid, nodes }) {
  const r = {
    tag: 'fragment', type: () => 'fragment',
    uid: 'each:' + uid,
    key: attrs.get('key')
  };
  r.updates = [
    makeApplicator(() => ({ itemId, itemNode: compileNode({ tag, attrs, uid, nodes }) }), '$each')
  ];
  if ((expr.slice(0, 2) === '<-')) {
    (r.inits || (r.inits = [])).push(c => c.connect(expr.slice(2).trim(), rr => ({ $data: rr })));
  } else {
    (r.updates || (r.updates = [])).push(makeApplicator(expression('{:'.includes(expr[0]) ? expr : '{{' + expr + '}}'), '$data'));
  }
  return r;
}

export function compileNode({ tag, attrs, uid, nodes }) {
  // ui:each
  const each = attrs.get('ui:each');
  if (each) {
    attrs.delete('ui:each');
    return compileEach(each.split(' '), { tag, attrs, uid, nodes });
  }

  let r = { tag, uid, type: compileType(tag), key: attrs.get('key'), ref: attrs.get('ui:ref') };
  let $nodes = nodes;

  // attrs
  attrs.forEach((v, k) => {
    if (k !== 'key' && k.slice(0, 3) !== 'ui:') {
      // console.log('compileAttrs', k, v);
      if ((v.slice(0, 2) === '<-')) {
        (r.inits || (r.inits = [])).push(c => c.connect(v.slice(2).trim(), rr => ({ [k]: rr })));
      } else if (v.slice(0, 2) === '->') {
        (r.updates || (r.updates = [])).push(makeApplicator(emitter(v.slice(2).trim()), k));
      } else {
        (r.updates || (r.updates = [])).push(makeApplicator(expression(v), k));
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

  // ui:if
  const aIf = attrs.get('ui:if');
  if (aIf) {
    const neg = aIf[0] === '!' ? aIf.slice(1) : null;
    r.iff = neg ? c => !c.prop(neg) : c => !!c.prop(aIf);
    if (nodes && nodes.length) {
      const ifElse = nodes.find(e => e.tag === 'ui:else');
      const ifThen = nodes.find(e => e.tag === 'ui:then');
      if (ifElse) {
        r.iff.else = ifElse.nodes.map(compileNode);
        $nodes = (ifThen ? ifThen.nodes : $nodes.filter(e => e !== ifElse));
      } else if (ifThen) {
        $nodes = ifThen.nodes;
      }
    }
  }

  r.nodes = $nodes.map(compileNode);
  return r;
}

