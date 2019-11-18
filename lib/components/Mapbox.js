/* eslint-disable no-undef */
class Point {
  constructor({ longitude, latitude }) {
    this.up({ longitude, latitude })
  }
  up(delta) {
    return Object.assign(this, delta)
  }
  vector() {
    return [this.longitude, this.latitude]
  }
  represent() {
    const { type = "Feature", icon = "monument", title = '', longitude, latitude } = this;
    return {
      type,
      "geometry": {
        "type": "Point",
        "coordinates": [longitude, latitude]
      },
      "properties": {
        title, icon
      }
    }
  }
}
Point.fromGeolocation = ({ coords }) => {
  return new Point(coords)
}
Point.fromData = ({ lat,lng }) => {
  return new Point({longitude:lng, latitude:lat})
}
function getLocation(cb) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(cb);
  } else {
    cb({ coords: { longitude: 23.8234751, latitude: 53.6769959 } })
    // ctx.firstChild.firstChild.innerHTML = "Geolocation is not supported by this browser.";
  }
}
export class Mapbox {
  get TEMPLATE() {
    return /* html */`
    <div class="map-container"><div style="position:absolute;top:50%;left:50%">Loading...</div></div>`
  }
  setDataLayer(data){
    if (!this.map) return;
    if (this.map.getLayer("points2")) {
      this.map.removeLayer("points2")
    }
    this.map.addLayer({
      "id": "points2",
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": [].concat(
            this.here? this.here.represent():[],
            (data||[]).map(e=>Point.fromData(e).represent())
          )
        }
      },
      "layout": {
        "icon-image": "{icon}-15",
        "text-field": "{title}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.6],
        "text-anchor": "top"
      }
    });
  }
  setData(data) {
    this.data = data;
    this.setDataLayer(this.data)
  }
  init({ ctx }) {
    setTimeout(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpdHNrZXZpY2giLCJhIjoiY2p5bWtwYmgwMGluZDNpbXRwMWk2eG51NyJ9.PHQubjbq-xlcJJGeBT4yNw';
      getLocation(pos => {
        this.here = Point.fromGeolocation(pos);
        const map = new mapboxgl.Map({
          container: ctx.firstChild, // container id
          style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
          center: this.here.vector(), // starting position [lng, lat]
          zoom: 13 // starting zoom
        });
        map.on('load', () => {
          this.map = map;
          ctx.firstChild.firstChild.innerHTML = ''
          this.setDataLayer(this.data)
        })
      })
    }, 0)
  }
}
