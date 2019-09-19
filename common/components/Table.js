import { filterFn } from '../core/utils.js'

export class Table {
  TEMPLATE() {
    return /* html */`
    <table class="table table-scroll">
        <thead>
        <tr>
            <th><a href="#sort?field={col1.id}">{col1.name}</a></th>
            <th ui:for="col of columns"><a click={onHeader} data-value={colField}>{colName}</a></th>
        </tr>
        </thead>
        <tbody>
        <tr ui:for="item of items">
            <td><a click={onItem} data-value={item.id}>{cell1}</a></td>
            <td ui:for="col of columns"><ui:type>{cell}</ui:type></td>
        </tr>
        </tbody>
    </table>`
  }
  assign(delta) {
    if (delta && (delta.filter || delta.data || delta.sortBy)) {
      const filter = delta.filter || this.filter
      const data = delta.data || this.data
      const sortBy = delta.sortBy || this.sortBy
      delta.items = (data && filter) ? data.filter(filterFn(filter)) : data
      if (delta.items && sortBy) {
        delta.items.sort((e1, e2) => e1[sortBy] > e2[sortBy] ? 1 : -1)
      }
    }
    this.super_assign(delta)
  }
  setColumns(v) {
    this.col1 = v[0]
    this.columns = v.slice(1)
  }
  getCell1() {
    return this.item[this.col1.id]
  }
  getColName() {
    return this.col.name || this.col.id
  }
  getColField() {
    return this.col.field || this.col.id
  }
  getCell() {
    return this.item[this.col.id]
  }
  getType() {
    return this.itemIndex % 2 === 0 ? 'b' : 'i'
  }
}
