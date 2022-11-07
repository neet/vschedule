import { YoutubeChannelId } from './YoutubeChannelId';

describe('YoutubeChannelId', () => {
  it('constructs', () => {
    const channelId = new YoutubeChannelId('youtube');
    expect(channelId.value).toBe('youtube');
  });
});
