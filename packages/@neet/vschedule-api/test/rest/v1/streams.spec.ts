import { createAPI } from '../../../test-utils/api';

describe('StreamController', () => {
  it('can list streams', async () => {
    const { api } = createAPI();
    const data = await api.rest.v1.streams.$get();

    expect(data).toHaveLength(1);
    expect(data.at(0)?.title).toBe(
      '【3Dお披露目】ファンボファンガに、最後まで最高のファンサ【#鷹宮リオン3D】',
    );
  });
});
