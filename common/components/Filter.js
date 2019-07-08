let COUNTER = 1
export class FilterChipValueInputMenu {
  TEMPLATE () {
    return /* html */`
  <ul class="menu">
    <li class="menu-item" ui:each="item of items">
      <a click="{{onSelect}}" data-value="{{item.id}}" data-name="{{itemName}}">
        <div class="tile tile-centered mx-1">
          <figure class="avatar avatar-xs bg-primary" data-initial="{{itemName|initials}}"></figure>
          <div class="tile-content">{{itemName}}</div>
        </div>
      </a>
    </li>
  </ul>`
  }
  init () {
    const meta = this.meta
    if (meta.type === 'enum') {
      Object.app.fetch(meta.typeSpec, (err, items) => {
        this.assign({items})
      })
    }
    if (meta.type === 'dict') {
      Object.app.fetch('db:dict/' + meta.typeSpec, (err, items) => {
        this.assign({items})
      })
    }
  }
  get itemName () {
    return this.item.name || Object.app.resource(this.item.id)
  }
}
export class FilterChipValueInput {
  TEMPLATE () {
    return /* html */`
<div class="form-autocomplete">
  <div class="form-autocomplete-input">
    <input ui:ref="inputElt" class="form-input m-1" type="text" 
     style="height: 1.0rem; margin: .2rem"
     value="{{value}}"
     placeholder="value..." 
     focus="{{onFocus}}"
     blur="{{onBlur}}"
     input="{{onInput}}">
  </div>
  <ui:menuType ui:if="showMenu" meta="{{chip.data}}" onSelect="{{onSelectMenuItem}}"/>
</div>`
  }
  get menuType () {
    return 'FilterChipValueInputMenu'
  }
  get parent () {
    return this
  }
  init () {
    setTimeout(() => this.inputElt.focus(), 0)
  }
  onInput ({value}) {
    const hasSuggestions = !!this.filter.data.filter(e => e.name.includes(value)).length
    const search = hasSuggestions ? value : this.search
    this.filter.assign({
      search
    })
  }
  onFocus () {
    this.assign({ showMenu: true })
  }
  onBlur () {
    setTimeout(() => this.assign({ showMenu: false }), 1000)
  }
  onSelectMenuItem ({value, name}) {
    this.assign({value: name, showMenu: false })
    this.chip.setValue(value)
  }
}
export class FilterChip {
  TEMPLATE () {
    return /* html */`
<div class="chip">
  <figure class="avatar avatar-xs bg-primary" data-initial="and" ui:if="index"></figure>
  <span>{{data.name}}</span>
  <b class="bg-secondary rounded mx-1">{{data.op|upper}}</b>
  <FilterChipValueInput chip="{{this}}"/>
  <a class="btn btn-clear" aria-label="Close" role="button" data-id="{{data.id}}" click="{{onRemove}}"></a>
</div>`
  }
  getThis () {
    return this
  }
  onRemove ({id}) {
    this.filter.removeChip(id)
  }
  setValue (value) {
    this.filter.updateChip(this.data.id, {value})
  }
}
export class FilterAppendChip {
  TEMPLATE () {
    return /* html */`
<div class="form-autocomplete chip">
  <div class="form-autocomplete-input">
    <input class="form-input m-1" type="text" style="height: 1.0rem; margin: .2rem"
     value="{{value}}"
     placeholder="add filter by..." 
     focus="{{onFocus}}"
     blur="{{onBlur}}"
     enter="{{onEnter}}"
     input="{{onInput}}">
  </div>
  <ul class="menu" ui:if="showMenu">
    <li class="menu-item" ui:each="item of menu">
      <a click="{{onMenuItem}}" data-field="{{item.field}}">
        <div class="tile tile-centered mx-1">
          <figure class="avatar avatar-xs bg-primary" data-initial="{{item.name|initials}}"></figure>
          <div class="tile-content">{{item.name}}</div>
        </div>
      </a>
    </li>
  </ul>
</div>`
  }
  onInput ({value}) {
    this.filter.applySuggestion(value)
  }
  onFocus () {
    this.assign({ showMenu: true })
  }
  onBlur () {
    setTimeout(() => this.assign({ showMenu: false }), 1000)
  }
  onEnter () {
    this.onMenuItem(this.menu[0])
  }
  onMenuItem (chip) {
    this.assign({ showMenu: false })
    this.filter.addNewChip(chip)
  }
}
export class Filter {
  TEMPLATE () {
    return /* html */`
<div class="bg-gray">
  <FilterChip ui:each="chip of chips" data="{{chip}}" filter="{{this}}" index="{{chipIndex}}"/>
  <FilterAppendChip filter="{{this}}" value="{{search}}" menu="{{suggestedChips}}"/>
</div>`
  }
  getThis () {
    return this
  }
  setData (data) {
    this.suggestedChips = this.data = (data || [])
      .map(e => ({...e, name: e.id, field: e.id}))
  }
  getChips () {
    return this.chips || (this.chips = [])
  }
  addNewChip ({field}) {
    const datum = this.data.find(e => e.field === field)
    const chips = this.getChips().concat({...datum, op: 'eq', id: COUNTER++})
    this.assign({ chips, suggestedChips: this.data, search: '' })
  }
  removeChip (id) {
    const chips = this.getChips().filter(e => e.id !== id)
    this.assign({ chips })
    this.onChanged(chips)
  }
  updateChip (id, delta) {
    const chips = this.getChips()
    const chip = chips.find(e => e.id === id)
    Object.assign(chip, delta)
    this.onChanged(chips)
  }
  onChanged (chips) {
    const obj = chips.reduce((r, e) => { r[e.field + '__' + r.op] = e.value; return r }, {})
    this.changed({[this.field || 'filter']: obj})
  }
  applySuggestion (search) {
    const suggestedChips = this.data.filter(e => e.name.includes(search))
    this.assign(suggestedChips.length ? { search, suggestedChips } : {})
  }
}
