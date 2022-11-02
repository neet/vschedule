import { client } from '../test-utils/client';

describe('StreamController', () => {
  it('can list streams', async () => {
    const data = await client.listStreams();
    expect(data).toHaveLength(0);
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
