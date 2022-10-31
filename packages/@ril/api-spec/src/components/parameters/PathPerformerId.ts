import { z } from 'zod';

import { registry } from '../../api';

export const PathPerformerId = registry.registerParameter(
  'PathPerformerId',
  z
    .string()
    .uuid()
    .openapi({ param: { name: 'performerId', in: 'path' } }),
);
