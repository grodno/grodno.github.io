import assert from 'assert';
import { cyrlat } from './utils.js';

const SAMPLE = 'ліцкевіч цікавы нізкі Здароў марозны звонкi вечар, здароў скрыпучы мяккi снег! Якуб Колас';
const TEST = 'lickeviq cikavy nizki Zdarow marozny zvonki veqar, zdarow skrypuqy mjakki sneg! Jakub Kolas';

describe('mova', () => {

  it('cyrlat', () => {

    const result = cyrlat(SAMPLE);

    assert.equal(TEST, result);

  });
});
