import { client } from '../../../test-utils/client';
import { mockYoutubeWebsubService } from '../../../test-utils/inversify-config';
import { SEED_PERFORMER_ID } from '../../../test-utils/seed';

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

  it('can subscribe to a performer', async () => {
    await client.subscribeToPerformer({
      parameter: { performerId: SEED_PERFORMER_ID },
    });

    expect(mockYoutubeWebsubService.subscribeToChannel).toBeCalledWith(
      'UCV5ZZlLjk5MKGg3L0n0vbzw',
    );
  });
});
