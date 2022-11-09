import { z } from 'zod';

import { registry } from '../../api';
import { MediaAttachment } from './MediaAttachment';

export const Actor = registry.register(
  'Actor',
  z.object({
    name: z.string(),
    color: z.string(),
    url: z.string().url().nullable(),
    description: z.string().nullable(),
    avatar: MediaAttachment.nullable(),
    twitterUsername: z.string().nullable(),
    youtubeChannelId: z.string().nullable(),
  }),
);
