import { createHmac } from 'crypto';
import fs from 'fs';
import { advanceTo, clear } from 'jest-date-mock';
import path from 'path';
import { URLSearchParams } from 'url';

import { JobRepositoryInMemory } from '../src/adapters/dal/JobRepositoryInMemory';
import { IAppConfig } from '../src/app/services/AppConfig/AppConfig';
import { TYPES } from '../src/types';
import { client, request } from '../test-utils/client/client';
import { container } from '../test-utils/inversify-config';
import { SEED_STREAM_ID } from '../test-utils/seed';

const ytWebsubStreamScheduled = fs.readFileSync(
  path.join(__dirname, './__fixtures__/yt-websub-stream-scheduled.xml'),
);
const ytWebsubStreamTitleChanged = fs.readFileSync(
  path.join(__dirname, './__fixtures__/yt-websub-stream-title-changed.xml'),
);
const ytWebsubStreamDeleted = fs.readFileSync(
  path.join(__dirname, './__fixtures__/yt-websub-stream-deleted.xml'),
);

describe('/websub/youtube', () => {
  it('verifies WebSub subscription', async () => {
    advanceTo(0);

    const searchParams = new URLSearchParams({
      'hub.topic': `https://www.youtube.com/xml/feeds/videos.xml?channel_id=UCV5ZZlLjk5MKGg3L0n0vbzw`,
      'hub.challenge': '4605398436710972921',
      'hub.mode': 'subscribe',
      'hub.lease_seconds': '432000',
    });

    const result = await request
      .get('/websub/youtube?' + searchParams.toString())
      .send();

    const jobRepository = container.get<JobRepositoryInMemory>(
      TYPES.JobRepository,
    );

    expect(result.statusCode).toBe(200);
    expect(jobRepository.jobs.at(0)?.type).toBe('refresh');
    expect(jobRepository.jobs.at(0)?.scheduledAt.toISOString()).toBe(
      '1970-01-06T00:00:00.000Z',
    );

    clear();
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

  it('updates Atom feed', async () => {
    const config = container.get<IAppConfig>(TYPES.AppConfig);
    const hmac = createHmac(
      'sha1',
      config.entries.youtube.websubHmacSecret ?? '',
    );
    const digest = hmac
      .update(ytWebsubStreamTitleChanged)
      .digest()
      .toString('hex');

    const prev = (await client.listStreams())
      .filter((stream) => /pOXNZPi22yQ/.test(stream.url))
      .at(0);

    const result = await request
      .post('/websub/youtube')
      .set('Content-Type', 'application/atom+xml')
      .set('x-hub-signature', `sha1=${digest}`)
      .send(ytWebsubStreamTitleChanged);

    expect(result.status).toBe(200);

    const current = (await client.listStreams())
      .filter((stream) => /pOXNZPi22yQ/.test(stream.url))
      .at(0);

    expect(current?.updatedAt).not.toBe(prev?.updatedAt);
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
