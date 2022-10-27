import { z } from 'zod';

import { registry } from '../../api';
import { Actor } from './Actor';
import { MediaAttachment } from './MediaAttachment';

export const Stream = registry.register(
  'Stream',
  z.object({
    id: z.string().uuid(),
    title: z.string(),
    url: z.string().url(),
    description: z.string().optional(),
    thumbnail: MediaAttachment.optional(),
    createdAt: z.string().openapi({ format: 'date-time' }),
    updatedAt: z.string().openapi({ format: 'date-time' }),
    startedAt: z.string().openapi({ format: 'date-time' }),
    endedAt: z.string().openapi({ format: 'date-time' }).optional(),
    actor: Actor,
  }),
);
