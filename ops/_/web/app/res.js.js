
const { header, meta, res } = require('../../../utils.js')
const stringify = (x, s) => JSON.stringify(x, null, s)
const fromEnum = v => v.values.split('|').map(e => stringify({id: e, name: res(e)})).join(',\n    ')
const fromForm = v => v.items.map(e => stringify({
  id: e.id,
  name: res(e.id),
  shown: e.shown,
  type: e.type,
  typeSpec: e.typeSpec
})).join(',\n    ')
const output = () => `
${header('Application resources.')}
export default {
  /* Enumerations */
  ${meta.enums.map(e => `${e.enum}: [\n    ${fromEnum(e)}\n  ]`).join(',\n  ')},
  /* Forms */
  ${meta.forms.map(e => `${e.id}_form: [\n    ${fromForm(e)}\n  ]`).join(',\n  ')}
}
`
console.log(output())
