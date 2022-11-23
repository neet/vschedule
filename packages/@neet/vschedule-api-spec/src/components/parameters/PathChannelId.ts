import { z } from 'zod';

import { registry } from '../../api';

export const PathChannelId = registry.registerParameter(
  'PathChannelId',
  z.string().openapi({ param: { name: 'channelId', in: 'path' } }),
);
