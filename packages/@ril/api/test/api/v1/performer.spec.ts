import { client } from '../../../test-utils/client';

describe('Performer', () => {
  it('can create performer', async () => {
    const { id } = await client.createPerformer({
      requestBody: {
        youtubeChannelId: 'UCV5ZZlLjk5MKGg3L0n0vbzw',
        twitterUsername: 'TakamiyaRion',
        url: null,
        organizationId: null,
      },
    });

    const performer = await client.showPerformer({
      parameter: { performerId: id },
    });

    expect(performer.name).toMatch(/鷹宮リオン/);
    expect(performer.twitterUsername).toBe('TakamiyaRion');
    expect(performer.youtubeChannelId).toBe('UCV5ZZlLjk5MKGg3L0n0vbzw');
  });
});
