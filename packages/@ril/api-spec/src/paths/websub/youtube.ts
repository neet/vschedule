import { z } from 'zod';

import { registry } from '../../api';

export const YoutubeAtomFeedXmlNamespace = z.object({
  xmlns: z.string(),
  'xmlns:at': z.string(),
});

export const YoutubeAtomFeedCreate = z.object({
  feed: z.object({
    $: YoutubeAtomFeedXmlNamespace,
    entry: z.array(
      z.object({
        id: z.array(z.string()),
        title: z.array(z.string()),
        'yt:videoId': z.array(z.string()),
        'yt:channelId': z.array(z.string()),
      }),
    ),
  }),
});

export const YoutubeAtomFeedDelete = z.object({
  feed: z.object({
    $: YoutubeAtomFeedXmlNamespace,
    'at:deleted-entry': z.array(
      z.object({
        $: z.object({
          ref: z.string(),
          when: z.string(),
        }),
        link: z.array(
          z.object({
            $: z.object({
              href: z.string(),
            }),
          }),
        ),
        'at:by': z.array(
          z.object({
            name: z.array(z.string()),
            uri: z.array(z.string()),
          }),
        ),
      }),
    ),
  }),
});

export const YoutubeAtomFeed = z.union([
  YoutubeAtomFeedDelete,
  YoutubeAtomFeedCreate,
]);

export const YoutubeWebsubVerification = z.object({
  'hub.topic': z.string().url(),
  'hub.challenge': z.string(),
  'hub.mode': z.union([z.literal('subscribe'), z.literal('unsubscribe')]),
  'hub.lease_seconds': z.number().int(),
});

registry.registerPath({
  method: 'get',
  path: '/websub/youtube',
  operationId: 'verifyYoutubeWebsub',
  request: {
    params: YoutubeWebsubVerification,
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
      content: {
        'application/json': {
          schema: z.string(),
        },
      },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/websub/youtube',
  operationId: 'notifyYoutubeWebsub',
  request: {
    body: {
      required: true,
      content: {
        'application/atom+xml': {
          schema: YoutubeAtomFeed,
        },
      },
    },
  },
  responses: {
    200: {
      description: '成功時のレスポンスです',
    },
  },
});
