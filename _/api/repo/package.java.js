const { proper, meta, header, consts, resolveJavaType, writeFile } = require('../../../utils.js')

meta.structs.forEach(({id,items})=>writeFile(`api/repo/${proper(id)}Repository.java`,`
package ${consts.package}.repo;
${header()}

import ${consts.package}.model.${proper(id)};
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * ${proper(id)} repository.
 * Spring marker interface.
 * 
 * @see ${consts.docsUrl}#api/${consts.package}.repo.${proper(id)}Repository
 */
public interface ${proper(id)}Repository extends JpaRepository<${proper(id)}, Long> {
   
}`))

console.log(`
package ${consts.package}.repo;
${header()}

/**
 * Repositories package.
 */
`.trim())