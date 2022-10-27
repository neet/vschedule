import { z } from 'zod';

import { registry } from '../../api';

export const MediaAttachment = registry.register(
  'MediaAttachment',
  z.object({
    id: z.string().uuid(),
    filename: z.string(),
    blur: z.string(),
    createdAt: z.string().openapi({ format: 'date-time' }),
    updatedAt: z.string().openapi({ format: 'date-time' }),
    // bucket: z.string(),
  }),
);
