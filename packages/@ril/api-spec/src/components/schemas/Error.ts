import { z } from 'zod';

import { registry } from '../../api';

export const ErrorDetail = registry.register(
  'ErrorDetail',
  z.object({
    error: z.string(),
    description: z.string().optional(),
  }),
);

export const Error = registry.register(
  'Error',
  z.object({
    error: z.string(),
    message: z.string(),
    details: z.record(ErrorDetail).optional(),
  }),
);
