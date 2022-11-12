import { createRequest } from '../../../test-utils/client';

describe('StreamController', () => {
  const { client } = createRequest();

  it('can list streams', async () => {
    const data = await client.listStreams({ parameter: {} });
    expect(data).toHaveLength(1);
    expect(data.at(0)?.title).toBe(
      '【3Dお披露目】ファンボファンガに、最後まで最高のファンサ【#鷹宮リオン3D】',
    );
  });

  // it('can create stream', async () => {
  //   const { id } = await client.createStream({
  //     requestBody: {
  //       videoId: 'DxFvWl69s7M',
  //     },
  //   });

  //   const data = await client.showStream({ parameter: { streamId: id } });

  //   expect(data.url).toBe('https://www.youtube.com/watch');
  // });
});
