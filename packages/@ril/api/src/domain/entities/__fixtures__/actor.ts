import Color from 'color';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import { Timestamps } from '../../_shared/Timestamps';
import { MediaAttachment } from '../MediaAttachment';
import { Performer } from '../Performer';
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
    base64: '',
    timestamps: new Timestamps({
      createdAt: dayjs(),
      updatedAt: dayjs(),
    }),
    bucket: null,
    filename: 'avatar.png',
    width: 1,
    height: 1,
  }),
});
