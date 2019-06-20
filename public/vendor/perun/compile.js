import { expression, nextId } from './utils.js';

const makeApplicator = (get, k = '_') => (c, acc) => { acc[k] = get(c); };
const dType = dt => (dt === 'fragment' || dt === 'slot') ? (() => dt) : (c => c.prop(dt));
const compileType = tag => tag.slice(0, 3) === 'ui:' ? dType(tag.slice(3)) : () => tag;
const emitter = (v, fctr = expression(v)) => c => (data, opts) => c.emit(fctr(c), data, opts);
const attr = (r, v) => {
  let expr = v;
  if ((v.slice(0, 2) === '<-')) {
    const key = nextId('P');
    (r.inits || (r.inits = [])).push(c => c.owner.connect(v.slice(2).trim(), key));
    expr = '{{' + key + '}}';
  }
  return expression(expr);
};

export function compileNode({ tag, attrs, uid, nodes }) {
  const r = { tag, uid, type: compileType(tag), key: attrs.get('key') };
  let $nodes = nodes;

  // attrs
  attrs.forEach((v, k) => {
    if (k !== 'key' && k.slice(0, 3) !== 'ui:') {
      // console.log('compileAttrs', k, v);
      if (v.slice(0, 2) === '->') {
        (r.updates || (r.updates = [])).push(makeApplicator(emitter(v.slice(2).trim()), k));
      } else {
        (r.updates || (r.updates = [])).push(makeApplicator(attr(r, v), k));
      }
    }
  });
  // ui:ref
  let aRef = attrs.get('ui:ref');
  if (aRef) {
    (r.inits || (r.inits = [])).push(c => c.api.addRef(aRef, c.impl));
  }
  // ui:props
  let aProps = attrs.get('ui:props');
  if (aProps) {
    (r.updates || (r.updates = [])).push((get => (c, acc) => Object.assign(acc, get(c)))(attr(r, aProps)));
  }
  // ui:each
  const each = attrs.get('ui:each');
  if (each) {
    const [itemId, , expr] = each.split(' ');
    const e0 = expr[0];
    r.each = ({ itemId, get: attr(r, '<{:'.includes(e0) ? expr : '{{' + expr + '}}') });
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

