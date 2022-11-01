import dayjs from 'dayjs';
import { URL } from 'url';

import { Organization } from './Organization';
import { OrganizationId } from './OrganizationId';

describe('Organization', () => {
  it('constructs', () => {
    const id = OrganizationId.create().value;
    const organization = Organization.fromPrimitive({
      id,
      name: 'にじさんじ',
      url: new URL('https://www.nijisanji.jp/en'),
      color: '#ffffff',
      twitterUsername: 'nijisanji',
      createdAt: dayjs(),
      updatedAt: dayjs(),
    });

    expect(organization.id).toBe(id);
    expect(organization.name).toBe('にじさんじ');
  });
});
