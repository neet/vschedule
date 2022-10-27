import { z } from 'zod';

export const YoutubeAtomFeedXmlNamespace = z.object({
  xmlns: z.string(),
  'xmlns:at': z.string(),
});

export const YoutubeAtomFeedEntry = z.object({
  id: z.array(z.string()),
  title: z.array(z.string()),
  'yt:videoId': z.array(z.string()),
  'yt:channelId': z.array(z.string()),
});

export const YoutubeAtomFeedLink = z.object({
  href: z.string(),
});

export const YoutubeAtomFeedCreate = z.object({
  feed: z.object({
    $: YoutubeAtomFeedXmlNamespace,
    entry: z.array(YoutubeAtomFeedEntry),
  }),
});

export const YoutubeAtomFeedDelete = z.object({
  feed: z.object({
    $: YoutubeAtomFeedXmlNamespace,
    'at:deleted-entry': z.array(YoutubeAtomFeedLink),
  }),
});

export const YoutubeAtomFeed = z.union([
  YoutubeAtomFeedDelete,
  YoutubeAtomFeedCreate,
]);
