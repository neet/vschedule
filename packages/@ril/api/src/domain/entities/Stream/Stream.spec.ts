import dayjs from 'dayjs';
import { URL } from 'url';

import { actorFixture } from '../__fixtures__/actor';
import { Stream } from './Stream';
import { StreamId } from './StreamId';

describe('Stream', () => {
  it('constructs', () => {
    const stream = Stream.fromPrimitive({
      id: StreamId.create().value,
      title: '#NJU歌謡祭2021 / 後半',
      url: new URL('https://www.youtube.com/watch?v=TT5b3BzsZyI'),
      description: `総勢58名のライバーが出演するにじさんじのユニット歌謡祭です。いつもお馴染みのユニットや少しレアなユニットも…？`,
      ownerId: actorFixture.id.value,
      createdAt: dayjs('2021-01-01T00:00:00+09:00'),
      updatedAt: dayjs('2021-01-01T00:00:00+09:00'),
      startedAt: dayjs('2021-01-01T00:00:00+09:00'),
      endedAt: dayjs('2021-01-02T00:00:00+09:00'),
    });

    expect(stream.title).toBe('#NJU歌謡祭2021 / 後半');
    expect(stream.duration?.humanize()).toBe('a day');
  });
});
