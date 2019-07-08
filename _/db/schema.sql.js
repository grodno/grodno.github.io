const meta = require('../../meta.js')

const { PATH, APP_ID } = global.process.env
const DB_TYPES = {
    'ref':'uuid',
    date:'timestamp'
}
const db_types = t => DB_TYPES[t] ||'varchar(255)'
const db_field =({id,type,required})=>`${id} ${db_types(type)}${required?' NOT NULL':''}`

const tables = meta.structs.map(({id,items})=>`CREATE TABLE ${id} (
    id uuid PRIMARY KEY,
    ${items.map(db_field).join(',\n\t')}
);`)
const output = ()=>`

${tables.join('\n')}

`

console.log(output())