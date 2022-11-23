import { createAPI } from '../../../test-utils/api';
import { SEED_PERFORMER_ID } from '../../../test-utils/db-seed';

describe('PerformerController', () => {
  it('shows a single performer', async () => {
    const { api } = createAPI();

    const performer = await api.rest.v1.performers
      ._performerId(SEED_PERFORMER_ID)
      .$get();

    expect(performer.name).toBe('鷹宮リオン');
  });

  it('shows multiple performers', async () => {
    const { api } = createAPI();

    const performer = await api.rest.v1.performers.$get();
    expect(performer.at(0)?.name).toBe('鷹宮リオン');
  });
});
