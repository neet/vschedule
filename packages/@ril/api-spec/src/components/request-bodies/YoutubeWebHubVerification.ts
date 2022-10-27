import { z } from 'zod';

export const YoutubeWebHubVerification = z.object({
  'hub.topic': z.string().url(),
  'hub.challenge': z.string(),
  'hub.mode': z.union([z.literal('subscribe'), z.literal('unsubscribe')]),
  'hub.lease_seconds': z.number().int(),
});
