/* eslint-disable @typescript-eslint/no-explicit-any */
import { createHmac } from 'crypto';

import { IConfig } from '../src/app';
import { TYPES } from '../src/types';
import { createAPI } from '../test-utils/api';
import {
  SEED_PERFORMER_CHANNEL_ID,
  SEED_STREAM_ID,
} from '../test-utils/db-seed';
import { container } from '../test-utils/inversify-config';
import {
  ytWebsubStreamDeleted,
  ytWebsubStreamScheduled,
  ytWebsubStreamTitleChanged,
} from './__fixtures__';

describe('/websub/youtube', () => {
  let config: IConfig;

  beforeAll(() => {
    config = container.get<IConfig>(TYPES.Config);
  });

  it('receives Atom feed', async () => {
    const { api, supertest } = createAPI();
    const hmac = createHmac('sha1', config.youtube.websubHmacSecret);
    const digest = hmac
      .update(ytWebsubStreamScheduled)
      .digest()
      .toString('hex');

    const result = await supertest
      .post('/websub/youtube')
      .set('Content-Type', 'application/atom+xml')
      .set('x-hub-signature', `sha1=${digest}`)
      .send(ytWebsubStreamScheduled);
    expect(result.status).toBe(200);

    const streams = await api.rest.v1.streams.$get();
    const stream = streams
      .filter((stream) => /pOXNZPi22yQ/.test(stream.url))
      .at(0);

    expect(stream?.title).toBe(
      'あ～～～～～～～～～～～～～～～～～～～～【キレ雑/鷹宮リオン にじさんじ】',
    );
    expect(stream?.owner?.name).toBe('鷹宮リオン');
    expect(stream?.owner?.organization?.name).toBe('にじさんじ');
    expect(stream?.channelId).toBe(SEED_PERFORMER_CHANNEL_ID);
  });

  it('updates Atom feed', async () => {
    const { api, supertest } = createAPI();
    const hmac = createHmac('sha1', config.youtube.websubHmacSecret);
    const digest = hmac
      .update(ytWebsubStreamTitleChanged)
      .digest()
      .toString('hex');

    const prev = (await api.rest.v1.streams.$get())
      .filter((stream) => /pOXNZPi22yQ/.test(stream.url))
      .at(0);

    const result = await supertest
      .post('/websub/youtube')
      .set('Content-Type', 'application/atom+xml')
      .set('x-hub-signature', `sha1=${digest}`)
      .send(ytWebsubStreamTitleChanged);
    expect(result.status).toBe(200);

    const current = (await api.rest.v1.streams.$get())
      .filter((stream) => /pOXNZPi22yQ/.test(stream.url))
      .at(0);

    expect(current?.updatedAt).not.toBe(prev?.updatedAt);
  });

  it('rejects receiving Atom feed when HMAC did not match', async () => {
    const { api, supertest } = createAPI();
    const hmac = createHmac('sha1', 'some wrong secret');
    const digest = hmac
      .update(ytWebsubStreamScheduled)
      .digest()
      .toString('hex');

    const res = await supertest
      .post('/websub/youtube')
      .set('Content-Type', 'application/atom+xml')
      .set('x-hub-signature', `sha1=${digest}`)
      .send(ytWebsubStreamScheduled);
    expect(res.ok).toBe(false);

    const streams = await api.rest.v1.streams.$get();
    const stream = streams
      .filter((stream) => /0XnCry1Afzc/.test(stream.url))
      .at(0);

    expect(stream).toBeUndefined();
  });

  it('deletes Atom feed when received deleted-entry', async () => {
    const { api, supertest } = createAPI();
    const hmac = createHmac('sha1', config.youtube.websubHmacSecret);
    const digest = hmac.update(ytWebsubStreamDeleted).digest().toString('hex');

    const res = await supertest
      .post('/websub/youtube')
      .set('Content-Type', 'application/atom+xml')
      .set('x-hub-signature', `sha1=${digest}`)
      .send(ytWebsubStreamDeleted);
    expect(res.ok).toBe(true);

    await expect(
      api.rest.v1.streams._streamId(SEED_STREAM_ID).get(),
    ).rejects.toMatchObject({
      status: 404,
    });
  });
});
