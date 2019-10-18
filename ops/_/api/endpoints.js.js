const meta = require('../../meta.js')

const { PATH, APP_ID } = global.process.env
const DB_TYPES = {
    'ref':'uuid',
    date:'timestamp'
}
const db_types = t => DB_TYPES[t] ||'varchar(255)'
const db_field =({id,type,required})=>`${id} ${db_types(type)}${required?' NOT NULL':''}`

const tables = meta.operations.map(({ns,operation})=>`
app.get('${ns}/${operation}', req => service.${ns}.${operation}(req.params))`)

const output = ()=>`
app= app.Express()
${tables.join('')}
app.listen()
`

console.log(output())