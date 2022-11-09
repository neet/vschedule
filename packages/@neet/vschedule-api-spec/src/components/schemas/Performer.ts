import { z } from 'zod';

import { registry } from '../../api';
import { Actor } from './Actor';
import { Organization } from './Organization';

export const Performer = registry.register(
  'Performer',
  Actor.extend({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    organization: Organization.optional(),
  }),
);
