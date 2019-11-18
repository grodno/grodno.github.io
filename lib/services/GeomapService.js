
/**
 * The Geomap Service.
 */
export class GeomapService {
  getData() {
    // adapt and memoize
    return this.data || (this.data = this.db.getCollection('place'))
  }
}