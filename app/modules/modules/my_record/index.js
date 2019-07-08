/**
 * 
 * Auto-generated file. Do not edit.
 * @vendor https://epam.com
 */

import * as RecordsModule from './RecordsModule.js'

const toList = o => Object.keys(o).map(k=>typeof o[k] === 'function' ? o[k] : {NAME: k, TEMPLATE: o[k]})

export default [ 
  ...toList(RecordsModule)
]