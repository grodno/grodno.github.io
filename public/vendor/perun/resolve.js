const doEach = (data, itemId, owner, { type, props, nodes, uid, iff }, acc) => !data || !data.length ? acc :
    (data.reduce ? data : ('' + data).split(',')).reduce((m, d, index) => {
        owner.impl[itemId] = d;
        owner.impl[itemId + 'Index'] = index;
        const id = `${uid}-$${d.id || index}`;
        return resolveTemplate(owner, { type, props, nodes, uid: id, iff }, m);
    }, acc);

const doSlot = (owner, partial, acc) => {
    owner.content.forEach((v, k) => {
        if (partial ? v.key === partial : !v.key) {
            acc.set(k, v);
        }
    });
    return acc;
};

const resolveTemplateArray = (owner, tmpl, acc = new Map()) => tmpl && tmpl.length ? tmpl.reduce((m, t) => resolveTemplate(owner, t, m), acc) : null;
const resolveProps = (props, owner) => props && props.length ? props.reduce((acc, fnProp) => { fnProp(owner, acc); return acc; }, {}) : null;

function resolveRegular(acc, owner, { type, updates, inits, nodes, uid, key }, tag = type(owner)) {

    if (tag === 'slot') { return doSlot(owner, key, acc); }

    return acc.set(tag + uid, {
        tag,
        key,
        owner,
        inits,
        props: resolveProps(updates, owner),
        content: resolveTemplateArray(owner, nodes)
    });
}

export function resolveTemplate(owner, tmpl, acc = new Map()) {
    if (!tmpl) { return acc; }
    if (tmpl.reduce) { return tmpl.length ? resolveTemplateArray(owner, tmpl, acc) : acc; }
    if (tmpl.each) { return doEach(tmpl.each.get(owner), tmpl.each.itemId, owner, tmpl, acc); }
    if (tmpl.iff && !tmpl.iff(owner)) { return resolveTemplate(owner, tmpl.iff.else, acc); }
    return resolveRegular(acc, owner, tmpl);
}
