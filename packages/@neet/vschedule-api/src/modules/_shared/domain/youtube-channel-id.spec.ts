import { YoutubeChannelId } from './youtube-channel-id';

describe('YoutubeChannelId', () => {
  it('constructs', () => {
    const channelId = new YoutubeChannelId('youtube');
    expect(channelId.value).toBe('youtube');
  });
});
