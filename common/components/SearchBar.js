export class SearchBar {
  TEMPLATE () {
    return /* html */`
        <div class="input-group input-inline">
        <input class="form-input" type="text" placeholder="search" change="{{onChange}}"/>
        <button class="btn btn-primary input-group-btn">Search</button>
        </div>`
  }
  onChange (data) {
    this.changed({search: data.value})
  }
}
