import Color from 'color';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { URL } from 'url';

import { Timestamps } from '../../_shared/timestamps';
import { MediaAttachment } from '../media-attachment';
import { Organization } from '../organization';

export const organizationFixture = Organization.rehydrate({
  id: nanoid(),
  name: 'にじさんじ',
  url: new URL('https://example.com/'),
  color: new Color('#ffffff'),
  description: null,
  twitterUsername: null,
  youtubeChannelId: null,
  timestamps: new Timestamps({
    createdAt: dayjs(),
    updatedAt: dayjs(),
  }),
  avatar: MediaAttachment.rehydrate({
    id: nanoid(),
    blurDataUri:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAI0lEQVR4nGPgZTDeNLFnb5lTrqwlQ5GH0/+3p2xYFA/17gYAeW8KZZGWAkQAAAAASUVORK5CYII=',
    timestamps: new Timestamps({
      createdAt: dayjs(),
      updatedAt: dayjs(),
    }),
    bucket: null,
    remoteUrl: null,
    filename: 'avatar.png',
    width: 1,
    height: 1,
  }),
});
