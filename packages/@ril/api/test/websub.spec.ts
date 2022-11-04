import { createHmac } from 'crypto';
import fs from 'fs';
import path from 'path';
import { URLSearchParams } from 'url';

import { IAppConfig } from '../src/app/services/AppConfig/AppConfig';
import { TYPES } from '../src/types';
import { client, request } from '../test-utils/client/client';
import { container } from '../test-utils/inversify-config';
import { SEED_STREAM_ID } from '../test-utils/seed';

const ytWebsubStreamScheduled = fs.readFileSync(
  path.join(__dirname, './__fixtures__/yt-websub-stream-scheduled.xml'),
);
const ytWebsubStreamDeleted = fs.readFileSync(
  path.join(__dirname, './__fixtures__/yt-websub-stream-deleted.xml'),
);

describe('/websub/youtube', () => {
  it('verifies WebSub subscription', async () => {
    const searchParams = new URLSearchParams({
      'hub.topic': `https://www.youtube.com/xml/feeds/videos.xml?channel_id=UCV5ZZlLjk5MKGg3L0n0vbzw`,
      'hub.challenge': '4605398436710972921',
      'hub.mode': 'subscribe',
      'hub.lease_seconds': '432000',
    });

    const result = await request
      .get('/websub/youtube?' + searchParams.toString())
      .send();

    expect(result.text).toBe('4605398436710972921');
  });

  it('receives Atom feed', async () => {
    const config = container.get<IAppConfig>(TYPES.AppConfig);
    const hmac = createHmac(
      'sha1',
      config.entries.youtube.websubHmacSecret ?? '',
    );
    const digest = hmac
      .update(ytWebsubStreamScheduled)
      .digest()
      .toString('hex');

    const result = await request
      .post('/websub/youtube')
      .set('Content-Type', 'application/atom+xml')
      .set('x-hub-signature', `sha1=${digest}`)
      .send(ytWebsubStreamScheduled);

    expect(result.status).toBe(200);

    const streams = await client.listStreams();
    const stream = streams
      .filter((stream) => /pOXNZPi22yQ/.test(stream.url))
      .at(0);

    expect(stream?.title).toBe(
      'あ～～～～～～～～～～～～～～～～～～～～【キレ雑/鷹宮リオン にじさんじ】',
    );
    expect(stream?.owner?.name).toBe('鷹宮リオン');
    expect(stream?.owner?.organization?.name).toBe('にじさんじ');
  });

  it('rejects receiving Atom feed when HMAC did not match', async () => {
    const hmac = createHmac('sha1', 'some wrong secret');
    const digest = hmac
      .update(ytWebsubStreamScheduled)
      .digest()
      .toString('hex');

    const res = await request
      .post('/websub/youtube')
      .set('Content-Type', 'application/atom+xml')
      .set('x-hub-signature', `sha1=${digest}`)
      .send(ytWebsubStreamScheduled);
    expect(res.ok).toBe(false);

    const streams = await client.listStreams();
    const stream = streams
      .filter((stream) => /0XnCry1Afzc/.test(stream.url))
      .at(0);

    expect(stream).toBeUndefined();
  });

  // it('can subscribe to a youtube websub topic', async () => {
  //   await client.subscribeYoutubeWebsub({
  //     requestBody: {
  //       performerId: '---',
  //     },
  //   });
  //   expect(websubService.subscribeToChannel).toBeCalledWith({
  //   })
  // });

  it('deletes Atom feed when received deleted-entry', async () => {
    const config = container.get<IAppConfig>(TYPES.AppConfig);
    const hmac = createHmac(
      'sha1',
      config.entries.youtube.websubHmacSecret ?? '',
    );
    const digest = hmac.update(ytWebsubStreamDeleted).digest().toString('hex');

    const res = await request
      .post('/websub/youtube')
      .set('Content-Type', 'application/atom+xml')
      .set('x-hub-signature', `sha1=${digest}`)
      .send(ytWebsubStreamDeleted);
    expect(res.ok).toBe(true);

    expect(
      client.showStream({
        parameter: {
          streamId: SEED_STREAM_ID,
        },
      }),
    ).rejects.toMatchObject({
      status: 404,
    });
  });
});
