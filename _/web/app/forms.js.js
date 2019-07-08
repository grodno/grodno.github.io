
const { header, meta, res, capitalize } = require('../../../utils.js')
// const stringify = (x, s) => JSON.stringify(x, null, s)
const fromForm = v => v.items.map(e => `<${capitalize(e.type)}Field id="${e.id}" name="${res(e.id)}" spec="${e.typeSpec}"/>`).join('\n    ')
const output = () => `
${header('Application forms.')}

  ${meta.forms.map(e => `export class ${capitalize(e.id)}Form extends Form{
    TEMPLATE() {
      return /*html*/ \`
      <ui:fragment>
      ${fromForm(e)}
      </ui:fragment>\`
    }
  }`).join('\n')}

`
console.log(output())
