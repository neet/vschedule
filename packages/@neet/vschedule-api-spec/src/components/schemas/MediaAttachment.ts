import { z } from 'zod';

import { registry } from '../../api';

export const MediaAttachment = registry.register(
  'MediaAttachment',
  z.object({
    id: z.string(),
    filename: z.string(),
    blurDataUri: z.string(),
    width: z.number(),
    height: z.number(),
    url: z.string().url(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);
