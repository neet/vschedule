import { createAPI } from '../../../test-utils/api';
import { SEED_STREAM_ID } from '../../../test-utils/db-seed';

describe('StreamController', () => {
  it('shows a single stream', async () => {
    const { api } = createAPI();
    const data = await api.rest.v1.streams._streamId(SEED_STREAM_ID).$get();

    expect(data.title).toBe(
      '【3Dお披露目】ファンボファンガに、最後まで最高のファンサ【#鷹宮リオン3D】',
    );
  });

  it('shows multiple streams', async () => {
    const { api } = createAPI();
    const data = await api.rest.v1.streams.$get();

    expect(data).toHaveLength(1);
    expect(data.at(0)?.title).toBe(
      '【3Dお披露目】ファンボファンガに、最後まで最高のファンサ【#鷹宮リオン3D】',
    );
  });
});
