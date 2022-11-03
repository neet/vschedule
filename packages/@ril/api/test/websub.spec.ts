import { PrismaClient } from '@prisma/client';
import { createHmac } from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { URLSearchParams } from 'url';

import { IAppConfig } from '../src/app/services/AppConfig/AppConfig';
import { TYPES } from '../src/types';
import { client, request } from '../test-utils/client/client';
import { container } from '../test-utils/inversify-config';

describe('YoutubeWebsubController', () => {
  afterEach(async () => {
    const prisma = new PrismaClient();
    const record = await prisma.stream.findFirst({
      where: {
        url: 'https://www.youtube.com/watch?v=0XnCry1Afzc',
      },
    });
    if (record != null) {
      await prisma.stream.delete({
        where: { id: record.id },
      });
    }
  });

  it('can verify WebSub subscription', async () => {
    const searchParams = new URLSearchParams({
      'hub.topic':
        'https://www.youtube.com/xml/feeds/videos.xml?channel_id=UCjXHjE-OBd--vYcT83XdzTA',
      'hub.challenge': '4605398436710972921',
      'hub.mode': 'subscribe',
      'hub.lease_seconds': '432000',
    });

    const result = await request
      .get('/websub/youtube?' + searchParams.toString())
      .send();

    expect(result.text).toBe('4605398436710972921');
  });

  it('can receive Atom feed', async () => {
    const feed = await fs.readFile(
      path.join(__dirname, './__fixtures__/yt-websub-entry.xml'),
    );
    const config = container.get<IAppConfig>(TYPES.AppConfig);
    const hmac = createHmac(
      'sha1',
      config.entries.youtube.websubHmacSecret ?? '',
    );
    const digest = hmac.update(feed).digest().toString('hex');

    const result = await request
      .post('/websub/youtube')
      .set('Content-Type', 'application/atom+xml')
      .set('x-hub-signature', `sha1=${digest}`)
      .send(feed);
    expect(result.status).toBe(200);

    const streams = await client.listStreams();
    const stream = streams
      .filter((stream) => /0XnCry1Afzc/.test(stream.url))
      .at(0);

    expect(stream?.title).toBe('Test');
    expect(stream?.owner?.name).toBe('都 -みやこ-');
    expect(stream?.owner?.organization?.name).toBe('Demo organization');
  });

  it('rejects receiving Atom feed when HMAC did not match', async () => {
    const feed = await fs.readFile(
      path.join(__dirname, './__fixtures__/yt-websub-entry.xml'),
    );
    const hmac = createHmac('sha1', 'some wrong secret');
    const digest = hmac.update(feed).digest().toString('hex');

    const res = await request
      .post('/websub/youtube')
      .set('Content-Type', 'application/atom+xml')
      .set('x-hub-signature', `sha1=${digest}`)
      .send(feed);
    expect(res.ok).toBe(false);

    const streams = await client.listStreams();
    const stream = streams
      .filter((stream) => /0XnCry1Afzc/.test(stream.url))
      .at(0);

    expect(stream).toBeUndefined();
  });

  // Seedで入るperformerIdがわからないせいで冗長になっている。
  // seedスクリプトは普通にDBに入るデータ形式を書いたほうがいいんだろうか。

  // it('can subscribe to a youtube websub topic', async () => {
  //   await client.subscribeYoutubeWebsub({
  //     requestBody: {
  //       performerId: '---',
  //     },
  //   });
  //   expect(websubService.subscribeToChannel).toBeCalledWith({
  //   })
  // });
});
