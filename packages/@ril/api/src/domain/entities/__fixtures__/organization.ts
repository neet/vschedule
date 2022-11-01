import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { URL } from 'url';

import { Color } from '../../_shared';
import { Timestamps } from '../../_shared/Timestamps';
import { MediaAttachment } from '../MediaAttachment';
import { Organization } from '../Organization';

export const organizationFixture = Organization.rehydrate({
  id: nanoid(),
  name: 'にじさんじ',
  url: new URL('https://example.com/'),
  color: Color.fromHex('#ffffff'),
  timestamps: new Timestamps({
    createdAt: dayjs(),
    updatedAt: dayjs(),
  }),
  avatar: MediaAttachment.rehydrate({
    id: nanoid(),
    base64: '',
    timestamps: new Timestamps({
      createdAt: dayjs(),
      updatedAt: dayjs(),
    }),
    filename: 'avatar.png',
    width: 1,
    height: 1,
  }),
});
