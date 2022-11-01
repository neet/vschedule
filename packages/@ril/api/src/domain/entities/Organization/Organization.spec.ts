import dayjs from 'dayjs';
import { URL } from 'url';

import { Color } from '../../_shared';
import { Timestamps } from '../../_shared/Timestamps';
import { Organization } from './Organization';
import { OrganizationId } from './OrganizationId';

describe('Organization', () => {
  it('can be created', () => {
    const organization = Organization.create({
      name: 'にじさんじ',
      url: new URL('https://www.nijisanji.jp/en'),
      color: Color.fromHex('#ffffff'),
      twitterUsername: 'nijisanji',
    });

    expect(organization.name.value).toBe('にじさんじ');
  });

  it('can be rehydrated', () => {
    const id = OrganizationId.create().value;
    const organization = Organization.rehydrate({
      id,
      name: 'にじさんじ',
      url: new URL('https://www.nijisanji.jp/en'),
      color: Color.fromHex('#ffffff'),
      twitterUsername: 'nijisanji',
      timestamps: new Timestamps({
        createdAt: dayjs(),
        updatedAt: dayjs(),
      }),
    });

    expect(organization.id.value).toBe(id);
    expect(organization.name.value).toBe('にじさんじ');
  });
});
