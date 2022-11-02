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
    thumbnail: z.union([MediaAttachment, z.null()]),
    createdAt: z.string().openapi({ format: 'date-time' }),
    updatedAt: z.string().openapi({ format: 'date-time' }),
    startedAt: z.string().openapi({ format: 'date-time' }),
    endedAt: z.string().openapi({ format: 'date-time' }).nullable(),
    duration: z.string().nullable(),
    owner: z.union([Performer, z.null()]),
    casts: z.array(Performer),
  }),
);
