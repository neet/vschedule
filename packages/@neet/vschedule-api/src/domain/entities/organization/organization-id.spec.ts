import { nanoid } from 'nanoid';

import { OrganizationId } from './organization-id';

describe('OrganizationId', () => {
  it('can be constructed', () => {
    const value = nanoid();
    const id = new OrganizationId(value);
    expect(id.value).toBe(value);
  });
});
