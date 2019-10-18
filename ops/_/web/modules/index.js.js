const { header, walkSync, walkSubDir, path, writeFile } = require('../../../utils.js')
const baseDir = 'web/modules'
const ids =[];
const subIndex = (sub) => {
  const ids= walkSync(sub).map(p=>path.basename(p,'.js')).filter(id=>!id.includes('index'))
  const output = `
${header()}

${ids.map((id)=>`import * as ${id} from './${id}.js'`).join('\n')}

const toList = o => Object.keys(o).map(k=>typeof o[k] === 'function' ? o[k] : {NAME: k, TEMPLATE: o[k]})

export default [ 
  ${ids.map((id)=>`...toList(${id})`).join(',\n  ')}
]`
  writeFile(sub+'/index.js', output)
}

walkSubDir(baseDir, sub=>{
  ids.push(path.basename(sub,'.js'))
  subIndex(sub)
})

const output = ()=>/*js*/`
${header()}
/**
 * Index of all application modules.
 */
${ids.map((id)=>`import ${id} from './${id}/index.js'`).join('\n')}
export default [
  ${ids.map((id)=>`...${id}`).join(',\n  ')}
]
`

console.log(output().trim())