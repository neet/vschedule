import { YoutubeChannelId } from './YoutubeChannelId';

describe('YoutubeChannelId', () => {
  it('constructs', () => {
    const channelId = YoutubeChannelId.from('youtube');
    expect(channelId.valueOf()).toBe('youtube');
  });
});
