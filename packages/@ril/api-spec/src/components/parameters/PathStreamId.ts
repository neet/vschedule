import { z } from 'zod';

import { registry } from '../../api';

export const PathStreamId = registry.registerParameter(
  'PathStreamId',
  z
    .string()
    .uuid()
    .openapi({ param: { name: 'streamId', in: 'path' } }),
);
