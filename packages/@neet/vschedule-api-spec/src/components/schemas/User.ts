import { z } from 'zod';

import { registry } from '../../api';

export const User = registry.register(
  'User',
  z.object({
    id: z.string(),
    email: z.string().email(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);
