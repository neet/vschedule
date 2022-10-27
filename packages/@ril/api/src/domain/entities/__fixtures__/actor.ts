import dayjs from 'dayjs';
import * as uuid from 'uuid';

import { Actor } from '../Actor';
import { MediaAttachment } from '../MediaAttachment';
import { organizationFixture } from './organization';

export const actorFixture = Actor.fromPrimitive({
  id: uuid.v4(),
  description: 'description',
  name: '鷹宮リオン',
  youtubeChannelId: 'UCV5ZZlLjk5MKGg3L0n0vbzw',
  organization: organizationFixture,
  color: '#ff0000',
  avatar: MediaAttachment.fromPrimitive({
    id: uuid.v4(),
    createdAt: dayjs(),
    updatedAt: dayjs(),
    filename: 'avatar.png',
  }),
});
