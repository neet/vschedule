import { z } from 'zod';

import { registry } from '../../api';

export const PathMediaFilename = registry.registerParameter(
  'PathMediaFilename',
  z.string().openapi({ param: { name: 'mediaFilename', in: 'path' } }),
);
