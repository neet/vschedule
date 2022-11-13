import { nanoid } from 'nanoid';

import { PerformerId } from './performer-id';

describe('PerformerId', () => {
  it('can be constructed', () => {
    const value = nanoid();
    const id = new PerformerId(value);
    expect(id.value).toBe(value);
  });

  it('can be generated', () => {
    expect(new PerformerId().value).toHaveLength(21);
  });
});
