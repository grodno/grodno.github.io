

const grodnify = s => s + ',Гродно,Беларусь'

/**
 * The API class.
 */
export class GeoService {

  getRoutes() {
    return this._routes || (this._routes = this.res('routes').map(e => ({
      ...e,
      id: '' + e.id,
      title: '' + e.title,
      places: e.places.split(','),
      photo: e.photo || 'assets/placeholder.png',
      link: e.link || '//google.com/search?q=' + grodnify(e.title)
    })))
  }
  getPlaces() {
    // adapt and memoize
    return this._places || (this._places = this.res('places').map(e => ({
      ...e,
      id: '' + e.id,
      title: '' + e.title,
      tags: [e.tags, e.tags2, e.tags3].filter(Boolean),
      photo: e.photo || 'assets/placeholder.png',
      link: e.link || '//google.com/search?q=' + grodnify(e.title)
    })))
  }

  onToggleTag(tag, cb) {
    return this.app.local.toggleItemProperty('selectedTags', tag, cb)
  }

  onSelectRoute(data, cb) {
    return this.app.local.assign({
      selectedRoute: data,
      'selectedPlaces': data.places.map(id => ({ id }))
    }, cb)
  }

  onTogglePlace(data, cb) {
    return this.app.local.toggleArrayElement('selectedPlaces', data, cb)
  }

  onArrangePlace({ id, dir }, cb) {
    return this.app.local.arrangeArrayElement('selectedPlaces', id, dir, cb)
  }

  getSelectedRoute() {
    return this.app.local.get('selectedRoute') || this.getRoutes()[0] || {}
  }

  getSelectedPlaces() {
    const places = this.getPlaces();
    const selectedPlaces = localStore.get('selectedPlaces') || []
    return selectedPlaces.map(({ id }) => places.find(e => e.id === id)).filter(Boolean)
  }

  getSelectedPlacesIds() {
    const selectedPlaces = localStore.get('selectedPlaces') || []
    return selectedPlaces.map(({ id }) => id).join(',')
  }

  getSuggestedPhoto() {
    const places = this.getPlaces();
    const selectedPlaces = localStore.get('selectedPlaces') || []
    const fisrt = selectedPlaces.map(({ id }) => places.find(e => e.id === id))[0];
    return fisrt ? fisrt.photo : 'https://postim.by/post_photo/19370/xbfblucF1518108503.jpg';
  }

  getFilteredPlaces() {
    const selectedTags = localStore.get('selectedTags') || {}
    const selectedPlaces = localStore.get('selectedPlaces') || []
    const selectionIds = Object.keys(selectedTags)
    const places = this.getPlaces();
    const filtered = !selectionIds.length ? places : places
      .filter(e => selectionIds.reduce((r, tag) => r && e.tags.includes(tag), true))

    return filtered.map(e => ({
      ...e,
      selected: selectedPlaces.some(ee => ee.id === e.id)
    }))
  }
  getFilteredTags() {
    const selectedTags = localStore.get('selectedTags') || {}
    return Object.values(this.getFilteredPlaces().reduce((tags, e) => {
      e.tags.forEach(t => {
        if (!tags[t]) {
          tags[t] = {
            id: t,
            name: t,
            selected: !!selectedTags[t],
            count: 0
          }
        }
        tags[t].count++;
      })

      return tags
    }, {}))
  }
  getRouteMapUrl() {
    const places = this.getSelectedPlaces();
    const count = places.length
    return Object.url.stringify({
      target: 'https://www.google.com/maps/embed/v1/directions',
      params: {
        mode: 'walking',
        origin: grodnify(count > 0 ? places[0].address : 'Драматический театр'),
        destination: grodnify(count > 1 ? places[count - 1].address : 'Жилибера парк'),
        waypoints: count > 2 ? `${(places.slice(1, count - 1) || []).map(({ address }) => grodnify(address)).join('|')}` || null : null,
        key: `AIzaSyBqTz8FtKj2ghZxmxNnJVicYCpcuHUNRiM`
      }
    })
  }

}