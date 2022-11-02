import { z } from 'zod';

import { registry } from '../../api';

export const PathStreamId = registry.registerParameter(
  'PathStreamId',
  z.string().openapi({ param: { name: 'streamId', in: 'path' } }),
);
