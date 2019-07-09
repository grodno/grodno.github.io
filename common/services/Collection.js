import { sortBy } from 'furnitura';
import { AService } from './AService.js';

export class Collection extends AService {

  init() {
    this.api.subscribe('db', () =>
      this.api.db.getTable(this.table).toArray().then(data => { this.data = data; this.notify() }))
  }

  get selection() {
    return this._selection || (this._selection = new Set());
  }

  getTagged() {
    const data = this.data;
    if (!data) {
      return {}
    }
    const sel = [...this.selection];
    const dataPrepared = data.map(e => ({ ...e, $tags: new Set((e.tags || '').split(',').filter(Boolean)) }));
    const actualData = !sel.length ? dataPrepared : dataPrepared.filter(e => sel.reduce((r, s) => r && e.$tags.has(s), true));
    const tagsHash = actualData.reduce((r, e) => {
      e.$tags.forEach(id => {
        const tag = r[id] || (r[id] = { id, name: id, count: 0, selected: this.selection.has(id) });
        tag.count++
      })
      return r;
    }, {});

    const tags = Object.values(tagsHash)
      .sort((a, b) => a.selected === b.selected ? (a.count < b.count ? 1 : -1) : (!a.selected ? 1 : -1))
      .slice(0, sel.length + 7)
      .sort((a, b) => a.selected === b.selected ? (a.id > b.id ? 1 : -1) : (!a.selected ? 1 : -1));
    // const filter = state.filter;
    // const sortBy = state.sortBy;
    // const tags = state.tags;
    // let items = data; // data ? data.filter(filterFn(filter)) : 

    // if (items && sortBy) {
    //   items = items.sort((e1, e2) => e1[sortBy] < e2[sortBy] ? 1 : -1);
    // }
    const sortedData = sortBy(actualData, '-modified_at')
    return { tags, data: sortedData.slice(this.offset || 0, this.pageSize || 50), counts: { total: data.length, actual: actualData.length } }
  }

  onTag({ data: { id } }) {
    if (this.selection.has(id)) { this.selection.delete(id); } else { this.selection.add(id); }
    this.log('Tag', id);
  }

  /**
   * New Entry
   */
  getNewEntry() {
    return this.newEntry || {};
  }

  onOpenAddNew({ data }) {
    this.newEntry = { ...data, ...this.newEntry, open: true };
  }

  onCancelAddNew() {
    this.newEntry = { ...this.newEntry, open: false };
  }

  async onSaveNew({ data }) {
    delete data.id;
    await this.upsert(data)
    this.newEntry = { ...this.newEntry, data, open: false };
  }

  async onUpdate({ path: [kind], data }) {
    await this.update({ [kind]: [data] });
    this.log('Updated', data);
  }
  async onDelete({ path: [kind, id] }) {
    await this.update({ [kind]: [{ id, status: 'deleted' }] });
    this.log('Deleted', id);
  }
  upsert(data, cb) {
    this.log('upsert', data)
    return this.emit('db://upsert/' + this.table + '', data)
  }
}
