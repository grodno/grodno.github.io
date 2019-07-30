export class Mapbox {
  get TEMPLATE() {
    return /* html */`
    <div class="map-container"></div>`
  }
  init({ ctx }) {
    const T = this;
    setTimeout(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpdHNrZXZpY2giLCJhIjoiY2p5bWtwYmgwMGluZDNpbXRwMWk2eG51NyJ9.PHQubjbq-xlcJJGeBT4yNw';
      const map = new mapboxgl.Map({
        container: ctx.firstChild, // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [23.8234751, 53.6769959], // starting position [lng, lat]
        zoom: 13 // starting zoom
      });
      map.on('load', () => {
        map.addLayer({
          "id": "points2",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": T.data
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
