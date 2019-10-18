const { header, meta } = require('../../../utils.js')
const tables = meta.structs.map(({id, items}) => `${id}: '${[{id: 'id', indexed: true}, {id: 'modified_at', indexed: true}].concat(items).filter(e => e.indexed).map(e => e.id).join(', ')}'`)
const output = () => `
${header('IndexedDb schema.')}
export default {
  ${tables.join(',\n  ')}
}`
console.log(output())
