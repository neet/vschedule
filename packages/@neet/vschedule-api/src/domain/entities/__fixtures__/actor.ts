import Color from 'color';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import { Timestamps } from '../_shared/timestamps';
import { MediaAttachment } from '../media-attachment';
import { Performer } from '../performer';
import { organizationFixture } from './organization';

export const actorFixture = Performer.rehydrate({
  id: nanoid(),
  description: 'description',
  name: '鷹宮リオン',
  youtubeChannelId: 'UCV5ZZlLjk5MKGg3L0n0vbzw',
  organizationId: organizationFixture.id,
  color: new Color('#ff0000'),
  url: null,
  twitterUsername: 'TakamiyaRion',
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
    filename: 'avatar.png',
    remoteUrl: null,
    width: 1,
    height: 1,
  }),
});
