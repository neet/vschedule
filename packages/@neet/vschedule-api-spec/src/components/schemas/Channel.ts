import { z } from 'zod';

import { registry } from '../../api';

export const BaseChannel = registry.register(
  'BaseChannel',
  z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullish(),
  }),
);

export const YoutubeChannel = registry.register(
  'YoutubeChannel',
  BaseChannel.extend({
    type: z.literal('youtube'),
    url: z.string().url(),
  }),
);

export const TwitchChannel = registry.register(
  'TwitchChannel',
  BaseChannel.extend({
    type: z.literal('twitch'),
    url: z.string().url(),
  }),
);

export const TwicastingChannel = registry.register(
  'TwicastingChannel',
  BaseChannel.extend({
    type: z.literal('twicasting'),
    url: z.string().url(),
  }),
);

export const Channel = registry.register(
  'Channel',
  z.discriminatedUnion('type', [
    YoutubeChannel,
    TwitchChannel,
    TwicastingChannel,
  ]),
);
