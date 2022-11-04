import { client } from '../../../test-utils/client';

describe('Performer', () => {
  it('can create performer', async () => {
    const { id } = await client.createPerformer({
      requestBody: {
        name: '天宮こころ',
        twitterUsername: 'amamiya_kokoro',
        youtubeChannelId: 'UCkIimWZ9gBJRamKF0rmPU8w',
        url: null,
        organizationId: null,
      },
    });

    const performer = await client.showPerformer({
      parameter: { performerId: id },
    });

    expect(performer.name).toMatch(/天宮こころ/);
    expect(performer.twitterUsername).toBe('amamiya_kokoro');
    expect(performer.youtubeChannelId).toBe('UCkIimWZ9gBJRamKF0rmPU8w');
  });
});
