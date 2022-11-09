import { z } from 'zod';

import { registry } from '../../api';
import { Actor } from './Actor';

export const Organization = registry.register(
  'Organization',
  Actor.extend({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);
