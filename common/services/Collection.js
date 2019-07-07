import { urlParse, fnId } from 'fx';
import { AService } from './AService.js';

export class Collection extends AService {

  init() {
    this.api.addListener('db', () =>
      this.api.db.getTable(this.table).toArray().then(data => { this.data = data; this.notify() })
      , true)
  }
  getOne(url) {
    const [kind, id] = url.path;
    let coll = this.getCollection(kind);
    return coll.get(id).then(d => (d ? { ...d, kind } : null));
  }
  getIndex(url) {
    // url = urlParse(url);
    // const [kind, index, indexKey, desc] = url.path;
    // if (!this.dbkeys.includes(kind)) {
    //   return null;
    // }
    // let coll = this.getTable(kind);
    // if (index && indexKey) {
    //   coll = coll.where(index).equals(indexKey);
    //   coll = desc === 'desc' ? coll.desc() : coll;
    // }
    // const filter = url.params;
    // if (filter) {
    //   coll = coll.filter(filterFn(filter));
    // }
    return this.data.slice(0, 50);
  }

  get selection() {
    return this._selection || (this._selection = new Set());
  }

  getTagged() {
    const sel = [...this.selection];
    const data = this.data;
    const dataPrepared = (this.data || []).map(e => ({ ...e, $tags: new Set((e.tags || '').split(',').filter(Boolean)) }));
    const actualData = !this.selection.size ? dataPrepared : dataPrepared.filter(e => sel.reduce((r, s) => r && e.$tags.has(s), true));
    const tagsHash = actualData.reduce((r, e) => {
      e.$tags.forEach(id => {
        const tag = r[id] || (r[id] = { id, name: id, count: 0, selected: this.selection.has(id) });
        tag.count++
      })
      return r;
    }, {});

    const tags = Object.values(tagsHash)
      .sort((a, b) => a.selected === b.selected ? (a.count < b.count ? 1 : -1) : (!a.selected ? 1 : -1))
      .slice(0, sel.length + 5)
      .sort((a, b) => a.selected === b.selected ? (a.id > b.id ? 1 : -1) : (!a.selected ? 1 : -1));
    // const filter = state.filter;
    // const sortBy = state.sortBy;
    // const tags = state.tags;
    // let items = data; // data ? data.filter(filterFn(filter)) : 

    // if (items && sortBy) {
    //   items = items.sort((e1, e2) => e1[sortBy] < e2[sortBy] ? 1 : -1);
    // }
    return { tags, data: actualData.slice(0, 50) }
  }

  onTag({ data: { id } }) {
    if (this.selection.has(id)) {
      this.selection.delete(id);
    } else {
      this.selection.add(id);
    }
    this.log('Tag', id);
  }

  async onCreate({ path: [kind], data }) {
    data.id = this.remote.nextId(kind);
    await this.update({ [kind]: [data] });
    this.log('Created', data);
  }
  async onUpdate({ path: [kind], data }) {
    await this.update({ [kind]: [data] });
    this.log('Updated', data);
  }
  async onDelete({ path: [kind, id] }) {
    await this.update({ [kind]: [{ id, status: 'deleted' }] });
    this.log('Deleted', id);
  }
}
