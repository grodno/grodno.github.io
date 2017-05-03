import assert from 'assert';
import { analyze } from './index.js';
const TEST = 'ліцкевіч цікавы нізкі Здароў марозны звонкi вечар, здароў скрыпучы мяккi снег! Якуб Колас';
const TEST2 = `Qago vam xoqac sa, panove?
Jaki vas vyklikaw prymus
Zabicj tryvogu ab tej move,
Jakoj azvaw sa belarus?`;

describe('mova', () => {

  it('analyze', () => {
    const result = analyze(TEST2);
    console.log(result.words);
    assert.equal(2, result.words.zdar.count);

  });
});
