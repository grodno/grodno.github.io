export class Map {
  get TEMPLATE() {
    return /* html */`
    <div class="map-container"></div>`
  }
  init({ ctx }) {
    setTimeout(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpdHNrZXZpY2giLCJhIjoiY2p5MTlibGdvMDlodjNub2h3amR0dDY5aCJ9.9_KmMHsPcWhrN06K2MBpsg';
      this.map = new mapboxgl.Map({
        container: ctx.firstChild, // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [23.57, 53.45], // starting position [lng, lat]
        zoom: 7 // starting zoom
      });
      this.map.onload = () => this.map.load(this.data)
    }, 0)
  }
}
