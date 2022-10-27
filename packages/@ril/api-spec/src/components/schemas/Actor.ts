import { z } from 'zod';

import { registry } from '../../api';
import { MediaAttachment } from './MediaAttachment';

export const Actor = registry.register(
  'Actor',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    color: z.string(),
    description: z.string().optional(),
    avatar: MediaAttachment.optional(),
    twitterUsername: z.string().optional(),
  }),
);
