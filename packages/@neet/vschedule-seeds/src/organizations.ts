import { OrganizationSeed } from './types';

export const NIJISANJI_YOUTUBE_CHANNEL_ID = 'UCX7YkU9nEeaoZbkVLVajcMg';
export const HOLOLIVE_YOUTUBE_CHANNEL_ID = 'UCJFZiqLMntJufDCHc6bQixg';

export const organizations: OrganizationSeed[] = [
  {
    name: 'にじさんじ',
    color: '#2d4b70',
    description: '',
    url: 'https://www.nijisanji.jp/',
    twitterUsername: 'nijisanji_app',
    youtubeChannelId: NIJISANJI_YOUTUBE_CHANNEL_ID,
  },
  {
    name: 'ホロライブ',
    color: '#43c5f5',
    description: '',
    url: 'https://hololive.hololivepro.com/',
    twitterUsername: 'hololivetv',
    youtubeChannelId: HOLOLIVE_YOUTUBE_CHANNEL_ID,
  },
];
