import { ShowPerformer, UpsertPerformer } from '../src/app';
import { SEED_ORGANIZATION_ID } from '../test-utils/db-seed';
import { container } from '../test-utils/inversify-config';

describe('UpsertPerformer', () => {
  it('creates performer', async () => {
    const upsert = container.get(UpsertPerformer);
    const show = container.get(ShowPerformer);

    await upsert.invoke({
      youtubeChannelId: 'UCD-miitqNY3nyukJ4Fnf4_A',
      name: '月ノ美兎',
      url: null,
      twitterUsername: 'MitoTsukino',
      organizationId: SEED_ORGANIZATION_ID,
      color: '#ff0000',
      description: null,
    });

    const res = await show.invoke({
      youtubeChannelId: 'UCD-miitqNY3nyukJ4Fnf4_A',
    });
    expect(res.name).toBe('月ノ美兎');
  });

  it('updates performer', async () => {
    const upsert = container.get(UpsertPerformer);
    const show = container.get(ShowPerformer);

    await upsert.invoke({
      youtubeChannelId: 'UCV5ZZlLjk5MKGg3L0n0vbzw',
      name: '鷹宮リオン2',
      url: null,
      twitterUsername: 'TakamiyaRion',
      organizationId: SEED_ORGANIZATION_ID,
      color: '#ff0000',
      description: null,
    });

    const res = await show.invoke({
      youtubeChannelId: 'UCV5ZZlLjk5MKGg3L0n0vbzw',
    });
    expect(res.name).toBe('鷹宮リオン2');
  });
});
