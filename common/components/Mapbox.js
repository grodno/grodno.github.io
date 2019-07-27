export class Mapbox {
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
        center: [23.8234751, 53.6769959], // starting position [lng, lat]
        zoom: 13 // starting zoom
      });
      this.map.on('load', function () {
        this.map.addLayer({
          "id": "points",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": this.data
          },
          "layout": {
            "icon-image": "{icon}-15",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
          }

        });
      })
    }, 0)
  }
}
