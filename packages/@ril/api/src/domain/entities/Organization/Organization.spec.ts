import { URL } from 'url';
import * as uuid from 'uuid';

import { Organization } from './Organization';

describe('Organization', () => {
  it('constructs', () => {
    const id = uuid.v4();
    const organization = Organization.fromPrimitive({
      id,
      name: 'にじさんじ',
      url: new URL('https://www.nijisanji.jp/en'),
      color: '#ffffff',
      twitterUsername: 'nijisanji',
    });

    expect(organization.id).toBe(id);
    expect(organization.name).toBe('にじさんじ');
  });
});
