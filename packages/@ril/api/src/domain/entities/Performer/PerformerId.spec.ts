import { nanoid } from 'nanoid';

import { PerformerId } from './PerformerId';

describe('PerformerId', () => {
  it('can be constructed', () => {
    const value = nanoid();
    const id = new PerformerId(value);
    expect(id.value).toBe(value);
  });

  it('can be generated', () => {
    expect(PerformerId.create().value).toHaveLength(21);
  });
});
