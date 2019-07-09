import { AService } from './AService.js';

export class ResService extends AService {
    getResource({ path }) {
        return Object.R(path[0])
    }

    getEnum({ path }) {
        return Object.R(path[0]).map(e => ({ ...e, name: e.name || Object.R(e.id) }))
    }
}