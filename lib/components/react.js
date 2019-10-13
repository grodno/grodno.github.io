import ReactDOM from 'react-dom';

export const reagent = (name, renderFn) => {
    const cl = class {
        constructor($, attrs = {}) {
            this.elt = document.createElement(attrs.containerTag || 'DIV');
            this.elt.className = "react-" + name + " " + (attrs.containerClass || '')
            this.state = attrs;
        }
        done() {
            const e = this.elt;
            const p = e.parentElement;
            if (p) {
                p.removeChild(e);
            }
            this.elt = this.state = null;
        }
        set(delta) {
            this.state = Object.assign(this.state, delta);
            return delta && Object.keys(delta).length;
        }
        render(p) {
            const e = this.elt;
            const before = p.cursor ? p.cursor.nextSibling : p.firstChild;
            if (!before) {
                p.appendChild(e);
            } else if (e !== before) {
                p.insertBefore(e, before);
            }
            ReactDOM.render(renderFn(this.state), e)
            p.cursor = e;
        }
    }
    return Object.assign(cl, { NAME: name, TEMPLATE: '' })
}