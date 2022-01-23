import * as uuid from 'uuid';

import { InvalidUuidError, Uuid } from './Uuid';

describe('TwitterUsername', () => {
  it('constructs', () => {
    const id = uuid.v4();
    const vo = Uuid.from(id);
    expect(vo.valueOf()).toBe(id);
  });

  it('throws an error', () => {
    expect(() => Uuid.from('yay')).toThrow(InvalidUuidError);
  });
});
