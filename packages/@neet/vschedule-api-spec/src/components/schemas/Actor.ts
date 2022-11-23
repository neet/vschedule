import { z } from 'zod';

import { registry } from '../../api';
import { Channel } from './Channel';
import { MediaAttachment } from './MediaAttachment';

export const Actor = registry.register(
  'Actor',
  z.object({
    name: z.string(),
    color: z.string(),
    url: z.string().url().nullable(),
    description: z.string().nullable(),
    // TODO: Change to nullable
    avatar: MediaAttachment.optional(),
    twitterUsername: z.string().nullable(),
    youtubeChannelId: z.string().nullable(),
    channels: z.array(Channel),
  }),
);
