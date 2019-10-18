
const { header, consts } = require('../../../utils.js')

const output = () => `
${header('Application constants.')}
export default {
  ${Object.keys(consts).map(k => `${k}: ${JSON.stringify(consts[k])}`).join(',\n  ')}
}
`
console.log(output())
