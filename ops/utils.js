const fs = require('fs');
const path = require('path');
const meta = require('./meta.js')
const env = (ENV => Object.keys(ENV).reduce((r,k)=>{if (k.slice(0,4)==='APP_') { r[k.slice(4)]=ENV[k]}; return r},{}))(global.process.env)
const consts = meta.consts
/**
 *  Utils.
 */
function capitalize(x) {

  if (!x) {
    return '';
  }
  const s = '' + x;

  return s[ 0 ].toUpperCase() + s.slice(1);
}
const camelize = (s, sep = '_') => (s && s.length && s.split(sep).map((t, i) =>(i ? capitalize(t) : t)).join('') || ``)


function onError(err) {
  if (err) return console.log(err);
}

const writeFile  = (f,c)=>fs.writeFile(f,c.trim(), onError)

const walkSync = (d) => fs.statSync(d).isDirectory() ? [].concat(...fs.readdirSync(d).map(f => walkSync(path.join(d, f)))) : d;
const walkSubDir = (d, fn) => {
  if(fs.statSync(d).isDirectory()){
    return fs.readdirSync(d).forEach(f => fs.statSync(path.join(d,f)).isDirectory() ? fn(path.join(d,f)) : null)
  } 
}

const header = (s='')=>`
/**
 * ${s}
 * Auto-generated file. Do not edit.
 * @vendor ${consts.vendorUrl}
 */
`.trim()

const JAVA_TYPES = {
  'ref':'String',
  date: 'Datetime'
}

const resolveJavaType = t => JAVA_TYPES[t] ||'String'
const res = x => meta.strings[x] 

module.exports = {
  capitalize,
  camelize,
  writeFile,
  header,
  env,
  resolveJavaType,
  meta,
  consts,
  res,
  
  path,
  walkSync,
  walkSubDir,
  format: (s, ...args) => (s && s.length && s.replace(/\{(\d+)\}/g, (_, d) => (args[+d] || '')) || ''),
  snakeCase: (x) => (x || '').replace(/([a-z])([A-Z])/g, '$1_$2'),
  proper: s=> capitalize(camelize(s))
}


