import { z } from 'zod';

import { registry } from '../../api';
import { MediaAttachment } from './MediaAttachment';
import { Performer } from './Performer';

export const Stream = registry.register(
  'Stream',
  z.object({
    id: z.string(),
    title: z.string(),
    url: z.string().url(),
    description: z.string().nullable(),
    thumbnail: MediaAttachment.optional(),
    createdAt: z.string().openapi({ format: 'date-time' }),
    updatedAt: z.string().openapi({ format: 'date-time' }),
    startedAt: z.string().openapi({ format: 'date-time' }),
    endedAt: z.string().openapi({ format: 'date-time' }).nullable(),
    duration: z.string().nullable(),
    owner: Performer.optional(),
    casts: z.array(Performer),
  }),
);
