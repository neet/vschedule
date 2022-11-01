import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import { Color } from '../../_shared';
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
  color: Color.fromHex('#ff0000'),
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
