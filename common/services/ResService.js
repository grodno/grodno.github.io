
export class ResService {
    onResource({ path }) {
        return Object.R(path[0])
    }

    onEnum({ data: { enum: id } }) {
        return !id ? [] : Object.R(id).map(e => ({ ...e, name: e.name || Object.R('enum.' + e.id) || e.id }))
    }
}