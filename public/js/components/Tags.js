export class Tags {
  get TEMPLATE() {
    return /* html*/`<div class="ui mini labels">
    <ui:fragment ui:each="tag of tags">
        <ui:fragment ui:if="itemSelected">
            <ui:then>
                <span class="chip bg-success" data-id="{{tag.id}}" click="{{onItemClick}}">
                    <span>{{tag.id}} <small>{{tag.count}}</small></span>
                </span>
            </ui:then>
            <ui:else>
                <span class="chip" data-id="{{tag.id}}" click="{{onItemClick}}">
                    <span>{{tag.id}} <small>{{tag.count}}</small></span>
                </span>
            </ui:else>
        </ui:fragment>
    </ui:fragment>
</div>`;
  }

  getData() {
    return this.data || (this.data = []);
  }
  setData(v) {
    if (v && v.length) {
      this.data = v;
    }
  }
  get selection() {
    return this._selection || (this._selection = new Set());
  }
  get tags() {
    const sel = [...this.selection];
    const items = !this.selection.size ? this.getData() : this.getData().filter((e) => {
      const etags = ('' + e.tags).split(',');
      return sel.reduce((r, s) => r && etags.includes(s), true);
    });
    const tags = [].concat(items).reduce((r, e) => {
      const etags = ('' + e.tags).split(',');
      const match = !this.selection.size || etags.find(t => this.selection.has(t));
      if (match) {
        etags.forEach(t => { if (t) { r[t] = (r[t] || 0) + 1; } });
      }
      return r;
    }, {});

    return Object.keys(tags).sort().map(id => ({ id, count: tags[id] }));
  }

  get itemSelected() {
    const id = this.tag.id;
    return this.selection.has(id);
  }

  onItemClick({ id }) {
    if (this.selection.has(id)) {
      this.selection.delete(id);
    } else {
      this.selection.add(id);
    }

    this.assign({});

    if (this.selectionChanged) { this.selectionChanged({ tags: [...this.selection] }); }
  }
}
