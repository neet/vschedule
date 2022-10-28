import dayjs from 'dayjs';
import * as uuid from 'uuid';

import { MediaAttachment } from '../MediaAttachment';
import { Performer } from '../Performer';
import { organizationFixture } from './organization';

export const actorFixture = Performer.fromPrimitive({
  id: uuid.v4(),
  description: 'description',
  name: '鷹宮リオン',
  youtubeChannelId: 'UCV5ZZlLjk5MKGg3L0n0vbzw',
  organizationId: organizationFixture.id.value,
  color: '#ff0000',
  avatar: MediaAttachment.fromPrimitive({
    id: uuid.v4(),
    base64: '',
    createdAt: dayjs(),
    updatedAt: dayjs(),
    filename: 'avatar.png',
  }),
});
