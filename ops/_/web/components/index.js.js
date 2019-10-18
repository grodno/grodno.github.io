const { header, walkSync, path } = require('../../../utils.js')

const ids = walkSync('web/components').map(p=> path.basename(p,'.js')).filter(id=>id!=='index')

const output = ()=>/*js*/`
${header()}

${ids.map((id)=>`import * as ${id} from './${id}.js'`).join('\n')}

const toList = o => Object.keys(o).map(k=>typeof o[k] === 'function' ? o[k] : {NAME: k, TEMPLATE: o[k]})

export default [
  ${ids.map((id)=>`...toList(${id})`).join(',\n  ')}
]
` 

console.log(output().trim())