import { z } from 'zod';

import { registry } from '../../api';
import { Actor } from './Actor';
import { Organization } from './Organization';

export const Performer = registry.register(
  'Performer',
  Actor.extend({
    id: z.string(),
    createdAt: z.string().openapi({ format: 'date-time' }),
    updatedAt: z.string().openapi({ format: 'date-time' }),
    organization: Organization.optional(),
  }),
);
