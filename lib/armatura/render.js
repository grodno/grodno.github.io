import { registerTypes } from './register.js';
import { Component } from './component.js';

const deep = [];

export const render = (c, $content, ctx) => {

    if (!$content || !$content.size) {
        c.eachChild(cc => cc.done());
        return;
    }
    c.eachChild(cc => !$content.has(cc.uid) ? cc.done() : 0);

    deep.unshift('  ');
    const ch = c.children || (c.children = new Map());

    c.rendering = true;
    $content.forEach(({ tag, content, owner, props, inits, initials, ref, $if, $for, $tag }, uid) => {
        let cc = ch.get(uid);
        if (!cc) {
            props = props && props.data && initials && initials.data
                ? { ...props, ...initials, data: { ...initials.data, ...props.data } }
                : { ...props, ...initials }
            cc = new Component(registerTypes.getByTag(tag), { props, tag, ref, $if, $for, $tag, uid, ctx, owner, inits, parent: c });
            ch.set(uid, cc);
            // console.log('create', c.uid, tag, uid)
        }
        cc.owner = owner;
        cc.content = content;
        cc.prevElt = ctx.cursor;
        // console.log(deep.join(''), 'render', tag, props);
        cc.up(props);
    });
    c.eachChild(cc => !cc.isInited ? cc.init() : 0);
    c.rendering = false;

    deep.shift();
};
