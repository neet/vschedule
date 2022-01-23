import * as uuid from 'uuid';

import { TwitterUsername } from '../TwitterUsername';
import { Url } from '../Url';
import { Uuid } from '../Uuid';
import { Organization } from './Organization';
import { OrganizationName } from './OrganizationName';

describe('Organization', () => {
  it('constructs', () => {
    const id = uuid.v4();
    const organization = Organization.from({
      id: Uuid.from(id),
      name: OrganizationName.from('にじさんじ'),
      url: Url.from('https://www.nijisanji.jp/en'),
      twitterUsername: TwitterUsername.from('nijisanji'),
    });

    expect(organization.id).toBe(id);
    expect(organization.name).toBe('にじさんじ');
  });
});
