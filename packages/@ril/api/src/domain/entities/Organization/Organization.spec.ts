import Color from 'color';
import dayjs from 'dayjs';
import { URL } from 'url';

import { Timestamps } from '../../_shared/Timestamps';
import { Organization } from './Organization';
import { OrganizationId } from './OrganizationId';

describe('Organization', () => {
  it('can be created', () => {
    const organization = Organization.create({
      name: 'にじさんじ',
      url: new URL('https://www.nijisanji.jp/en'),
      color: new Color('#ffffff'),
      description: null,
      avatar: null,
      twitterUsername: 'nijisanji',
      youtubeChannelId: null,
    });

    expect(organization.name.value).toBe('にじさんじ');
  });

  it('can be rehydrated', () => {
    const id = new OrganizationId();
    const organization = Organization.rehydrate({
      id,
      name: 'にじさんじ',
      url: new URL('https://www.nijisanji.jp/en'),
      color: new Color('#ffffff'),
      twitterUsername: 'nijisanji',
      description: null,
      avatar: null,
      youtubeChannelId: null,
      timestamps: new Timestamps({
        createdAt: dayjs(),
        updatedAt: dayjs(),
      }),
    });

    expect(organization.id.value).toBe(id);
    expect(organization.name.value).toBe('にじさんじ');
  });
});
