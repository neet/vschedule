import { z } from 'zod';

import { registry } from '../../api';
import { Actor } from './Actor';

export const Organization = registry.register(
  'Organization',
  Actor.extend({
    id: z.string(),
    createdAt: z.string().openapi({ format: 'date-time' }),
    updatedAt: z.string().openapi({ format: 'date-time' }),
  }),
);
