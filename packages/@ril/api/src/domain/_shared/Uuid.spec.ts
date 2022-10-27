import * as uuid from 'uuid';

import { InvalidUuidError, Uuid } from './Uuid';

describe('Uuid', () => {
  it('constructs', () => {
    const id = uuid.v4();
    const vo = new Uuid(id);
    expect(vo.valueOf()).toBe(id);
  });

  it('throws an error', () => {
    expect(() => new Uuid('yay')).toThrow(InvalidUuidError);
  });
});
