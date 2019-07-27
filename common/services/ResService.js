import { ApiService } from 'armatura';

export class ResService extends ApiService {
    getResource({ path }) {
        return Object.R(path[0])
    }

    getEnum({ data: { enum: id } }) {
        return !id ? [] : Object.R(id).map(e => ({ ...e, name: e.name || Object.R('enum.' + e.id) || e.id }))
    }
}