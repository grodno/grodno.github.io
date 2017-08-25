import { Component } from 'ui';

export default class Tags extends Component {

  static TEMPLATE = `
      <div class="ui mini labels">
        <block each="tag of tags">
          <block if="itemSelected">
          <then><a class="ui blue label" data-id="{{tag.id}}" click="{{onItemClick}}">{{tag.id}}<i class="icon close"></i> </a></then>
          <else><a class="ui label" data-id="{{tag.id}}" click="{{onItemClick}}">{{tag.id}}<div class="detail">{{tag.count}}</div></a></else>
          </block>
        </block>
      </div>`;

  static PROPS = {
    data: { default: [] },
    selection: { default: new Set() },
    selectionChanged:{ default: e=>e }
  }

  get tags() {

    const tags = this.data.reduce((r, e) => {

      const etags = e.tags || [];

      const match = !this.selection.size || etags.find(t=>this.selection.has(t));
        if (match) {
          etags.forEach(t=>{ r[t] = (r[t] || 0) + 1; });
        }
        return r;

    }, {});

    return Object.keys(tags).sort().map(id=>({ id, count:tags[id] }));
  }

  get itemSelected() {

    const id = this.get('tag.id');

    return this.selection.has(id);
  }

  onItemClick({ dataset: { id } }) {

    if (this.selection.has(id)) {
      this.selection.delete(id);
    } else {
      this.selection.add(id);
    }

    this.invalidate();

    this.selectionChanged(this.selection);
  }
}
