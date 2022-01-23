import dayjs from 'dayjs';
import * as uuid from 'uuid';

import { HexColor } from '..';
import { Actor, ActorDescription, ActorName } from '../entities/Actor';
import { MediaAttachment } from '../entities/MediaAttachment';
import { MediaAttachmentFilename } from '../entities/MediaAttachment/MediaAttachmentFilename';
import { Uuid } from '../entities/Uuid';
import { YoutubeChannelId } from '../entities/YoutubeChannelId';
import { organizationFixture } from './organization';

export const actorFixture = Actor.from({
  id: Uuid.from(uuid.v4()),
  description: ActorDescription.from('description'),
  name: ActorName.from('鷹宮リオン'),
  youtubeChannelId: YoutubeChannelId.from('UCV5ZZlLjk5MKGg3L0n0vbzw'),
  organization: organizationFixture,
  color: HexColor.from('#ff0000'),
  avatar: MediaAttachment.from({
    id: Uuid.from(uuid.v4()),
    blur: Buffer.from('blur'),
    createdAt: dayjs(),
    updatedAt: dayjs(),
    filename: MediaAttachmentFilename.from('avatar.png'),
  }),
});
