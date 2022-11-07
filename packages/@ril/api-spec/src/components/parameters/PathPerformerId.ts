import { z } from 'zod';

import { registry } from '../../api';

export const PathPerformerId = registry.registerParameter(
  'PathPerformerId',
  z.string().openapi({ param: { name: 'performerId', in: 'path' } }),
);
