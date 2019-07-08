/**
 * 
 * Auto-generated file. Do not edit.
 * @vendor https://epam.com
 */

import * as Medicians from './Medicians.js'
import * as VisitsModule from './VisitsModule.js'

const toList = o => Object.keys(o).map(k=>typeof o[k] === 'function' ? o[k] : {NAME: k, TEMPLATE: o[k]})

export default [ 
  ...toList(Medicians),
  ...toList(VisitsModule)
]