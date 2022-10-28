import dayjs from 'dayjs';
import { URL } from 'url';
import * as uuid from 'uuid';

import { MediaAttachment } from '../MediaAttachment';
import { Organization } from '../Organization';

export const organizationFixture = Organization.fromPrimitive({
  id: uuid.v4(),
  name: 'にじさんじ',
  url: new URL('https://example.com/'),
  color: '#ffffff',
  avatar: MediaAttachment.fromPrimitive({
    id: uuid.v4(),
    base64: '',
    createdAt: dayjs(),
    updatedAt: dayjs(),
    filename: 'avatar.png',
  }),
});
