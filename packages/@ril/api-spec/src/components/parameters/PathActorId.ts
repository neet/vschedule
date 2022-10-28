import { z } from 'zod';

import { registry } from '../../api';

export const PathActorId = registry.registerParameter(
  'PathActorId',
  z
    .string()
    .uuid()
    .openapi({ param: { name: 'actorId', in: 'path' } }),
);
