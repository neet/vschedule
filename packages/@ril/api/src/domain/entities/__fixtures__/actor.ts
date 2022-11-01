import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import { MediaAttachment } from '../MediaAttachment';
import { Performer } from '../Performer';
import { organizationFixture } from './organization';

export const actorFixture = Performer.fromPrimitive({
  id: nanoid(),
  description: 'description',
  name: '鷹宮リオン',
  youtubeChannelId: 'UCV5ZZlLjk5MKGg3L0n0vbzw',
  organizationId: organizationFixture.id.value,
  color: '#ff0000',
  // createdAt: dayjs(),
  // updatedAt: dayjs(),
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
