import { advanceTo, clear } from 'jest-date-mock';

import { ResubscriptionTaskRepositoryInMemory } from '../../../src/adapters';
import { TYPES } from '../../../src/types';
import { createAPI } from '../../../test-utils/api';
import { SEED_PERFORMER_CHANNEL_ID } from '../../../test-utils/db-seed';
import { container } from '../../../test-utils/inversify-config';

describe('ChannelController', () => {
  beforeEach(() => {
    advanceTo(0);
  });

  afterEach(() => {
    clear();
  });

  it('subscribes to a channel', async () => {
    const { api } = createAPI();

    // request
    await api.rest.v1.channels
      ._channelId(SEED_PERFORMER_CHANNEL_ID)
      .subscribe.$post();

    // verify
    const result = await api.websub.youtube.get({
      query: {
        'hub.topic': `https://www.youtube.com/xml/feeds/videos.xml?channel_id=UCV5ZZlLjk5MKGg3L0n0vbzw`,
        'hub.challenge': '4605398436710972921',
        'hub.mode': 'subscribe',
        'hub.verify_token': '',
        'hub.lease_seconds': 432000,
      },
    });

    const repository = container.get<ResubscriptionTaskRepositoryInMemory>(
      TYPES.ResubscriptionTaskRepository,
    );

    expect(result.status).toBe(200);
    expect(repository.tasks.at(0)?.scheduledAt.toISOString()).toBe(
      '1970-01-06T00:00:00.000Z',
    );
  });
});
