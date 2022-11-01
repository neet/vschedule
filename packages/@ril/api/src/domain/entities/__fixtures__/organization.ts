import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { URL } from 'url';

import { MediaAttachment } from '../MediaAttachment';
import { Organization } from '../Organization';

export const organizationFixture = Organization.fromPrimitive({
  id: nanoid(),
  name: 'にじさんじ',
  url: new URL('https://example.com/'),
  color: '#ffffff',
  createdAt: dayjs(),
  updatedAt: dayjs(),
  avatar: MediaAttachment.fromPrimitive({
    id: nanoid(),
    base64: '',
    createdAt: dayjs(),
    updatedAt: dayjs(),
    filename: 'avatar.png',
    width: 1,
    height: 1,
  }),
});
