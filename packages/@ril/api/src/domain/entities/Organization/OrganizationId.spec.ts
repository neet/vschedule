import { nanoid } from 'nanoid';

import { OrganizationId } from './OrganizationId';

describe('OrganizationId', () => {
  it('can be constructed', () => {
    const value = nanoid();
    const id = new OrganizationId(value);
    expect(id.value).toBe(value);
  });

  it('can be generated', () => {
    expect(OrganizationId.create().value).toHaveLength(21);
  });
});
