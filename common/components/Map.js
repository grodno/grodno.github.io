export class Map {
  get TEMPLATE() {
    return /* html */`
    <div style="position:fixed; top:40; bottom:0; left:0; right:0;width:100%; height:100%;"></div>`
  }
  init({ ctx }) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpdHNrZXZpY2giLCJhIjoiY2p5MTlibGdvMDlodjNub2h3amR0dDY5aCJ9.9_KmMHsPcWhrN06K2MBpsg';
    var map = new mapboxgl.Map({
      container: ctx.firstChild, // container id
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [23.57, 53.45], // starting position [lng, lat]
      zoom: 7 // starting zoom
    });
  }
  get itemName() {
    return this.item.name || Object.app.resource(this.item.id)
  }

  getThis() {
    return this
  }
  setData(data) {
    this.suggestedChips = this.data = (data || [])
      .map(e => ({ ...e, name: e.id, field: e.id }))
  }
  getChips() {
    return this.chips || (this.chips = [])
  }
  addNewChip({ field }) {
    const datum = this.data.find(e => e.field === field)
    const chips = this.getChips().concat({ ...datum, op: 'eq', id: COUNTER++ })
    this.assign({ chips, suggestedChips: this.data, search: '' })
  }

}
