import { pipes as PIPES } from './utils/index.js';
import R from './res.js';

export class MyApi {
  constructor() {
    Object.assign(this, { PIPES, R });
  }
}

