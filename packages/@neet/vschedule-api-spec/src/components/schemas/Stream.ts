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
    createdAt: z.date(),
    updatedAt: z.date(),
    startedAt: z.date(),
    endedAt: z.date().nullable(),
    duration: z.string().nullable(),
    owner: Performer.nullable(),
    casts: z.array(Performer),
  }),
);
