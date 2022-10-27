import { z } from 'zod';

import { registry } from '../../api';
import { Actor } from './Actor';

export const Performer = registry.register(
  'Performer',
  Actor.extend({
    youtubeChannelId: z.string(),
  }),
);
