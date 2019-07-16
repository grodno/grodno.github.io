const resolveSlot = (owner, id, acc) => {
    owner.content.forEach((v, k) => {
        if (id) {
            if (v.tag === owner.tag + ':' + id) {
                v.content.forEach(vv => acc.set(vv.uid, vv));
            }
        } else if (v.tag.slice(0, owner.tag.length + 1) !== owner.tag + ':') {
            acc.set(v.uid, v);
        }
    });
    return acc;
};

const resolveTemplateArray = (owner, tmpl, acc = new Map()) =>
    tmpl && tmpl.length ? tmpl.reduce((m, t) => resolveTemplate(owner, t, m), acc) : null;

const resolveProps = (props, owner) =>
    props && props.length ? props.reduce((acc, fnProp) => { fnProp(owner, acc); return acc; }, {}) : null;

function resolveRegular(acc, owner, { tag, updates, initials, inits, nodes, uid, id, ref, $if, $each }) {
    if (tag === 'ui:slot') { return resolveSlot(owner, id, acc); }
    const props = resolveProps(updates, owner);
    const content = resolveTemplateArray(owner, nodes)
    const $tag = (tag === 'ui:tag' ? props.tag : tag)
    return acc.set($tag + uid, { tag: $tag, id, uid, ref, owner, initials, inits, $if, $each, props, content });
}

export function resolveTemplate(owner, tmpl, acc = new Map()) {
    if (!tmpl) { return acc; }
    if (tmpl.reduce) { return tmpl.length ? resolveTemplateArray(owner, tmpl, acc) : acc; }
    return resolveRegular(acc, owner, tmpl);
}
