const { proper, meta, header, consts, resolveJavaType, writeFile } = require('../../../utils.js')

const field =({id,type,required})=>`
    ${required ? '@NonNull\n\t':''}@JsonProperty("${id}")
    private ${resolveJavaType(type)} ${id};`

const getsets =({id,type,required})=>`
    public ${resolveJavaType(type)} get${proper(id)}() {
        return ${id};
    }

    public void set${proper(id)}(${resolveJavaType(type)} ${id}) {
        this.${id} = ${id};
    }
`

meta.structs.forEach(({id,items})=>writeFile(`api/model/${proper(id)}.java`,`
package ${consts.package}.model;
${header()}

import ${consts.package}.enums.*;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * ${proper(id)} model object. 
 * 
 * @see ${consts.docsUrl}#api/${consts.package}.model.${proper(id)}
 */
@Entity
public class ${proper(id)} {
    ${items.map(field).join('\n\t')}
    ${items.map(getsets).join('')}
    @Override
    public String toString() {
        return "${proper(id)}{" +
                ${items.map(({id})=>`"${id}=" + ${id} `).join('+ "," +\n\t\t\t\t')} +
                '}';
    }
}`))

console.log(`
package ${consts.package}.model;
${header()}

/**
 * Model package.
 */
`.trim())