const { proper, meta, header, consts, writeFile } = require('../../../utils.js')

const field =(id)=>`${id.toUpperCase()}("${id}");`

meta.enums.forEach(({id, values})=>writeFile(`api/enums/${proper(id)}.java`,`
package ${consts.package}.enums;
${header()}

/**
 * ${proper(id)} enumeration.
 * 
 * @see ${consts.docsUrl}#api/${consts.package}.enums.${proper(id)}
 */

public enum ${proper(id)} {
    ${(values||'V|F').split('|').map(field).join('\n\t')}
}`))

console.log(`
package ${consts.package}.enums;
${header()}

/**
 * Enumerations package.
 */
`.trim())