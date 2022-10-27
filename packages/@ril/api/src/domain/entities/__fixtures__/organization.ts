import dayjs from 'dayjs';
import { URL } from 'url';
import * as uuid from 'uuid';

import { MediaAttachment } from '../MediaAttachment';
import { Organization } from '../Organization';

export const organizationFixture = Organization.fromPrimitive({
  id: uuid.v4(),
  name: 'にじさんじ',
  url: new URL('https://example.com/'),
  avatar: MediaAttachment.fromPrimitive({
    id: uuid.v4(),
    createdAt: dayjs(),
    updatedAt: dayjs(),
    filename: 'avatar.png',
  }),
});
