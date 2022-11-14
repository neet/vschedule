import dayjs from 'dayjs';
import { URL } from 'url';

import { actorFixture } from '../__fixtures__/actor';
import { Timestamps } from '../_shared';
import { Stream } from './stream';
import { StreamId } from './stream-id';

describe('Stream', () => {
  it('constructs', () => {
    const stream = Stream.rehydrate({
      id: new StreamId(),
      title: '#NJU歌謡祭2021 / 後半',
      url: new URL('https://www.youtube.com/watch?v=TT5b3BzsZyI'),
      description: `総勢58名のライバーが出演するにじさんじのユニット歌謡祭です。いつもお馴染みのユニットや少しレアなユニットも…？`,
      ownerId: actorFixture.id,
      castIds: [],
      timestamps: new Timestamps({
        createdAt: dayjs('2021-01-01T00:00:00+09:00'),
        updatedAt: dayjs('2021-01-01T00:00:00+09:00'),
      }),
      thumbnail: null,
      startedAt: dayjs('2021-01-01T00:00:00+09:00'),
      endedAt: dayjs('2021-01-02T00:00:00+09:00'),
    });

    expect(stream.title.value).toBe('#NJU歌謡祭2021 / 後半');
    expect(stream.duration?.humanize()).toBe('a day');
  });

  it('can update', () => {
    let stream = Stream.create({
      title: 'test',
      url: new URL('https://example.com'),
      ownerId: actorFixture.id,
      castIds: [],
      description: null,
      thumbnail: null,
      endedAt: null,
      startedAt: dayjs(),
    });

    const endedAt = dayjs();
    stream = stream.update({ title: 'test2', endedAt });

    expect(stream.title.value).toBe('test2');
    expect(stream.endedAt).toBe(endedAt);
  });
});
