import { z } from 'zod';

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
