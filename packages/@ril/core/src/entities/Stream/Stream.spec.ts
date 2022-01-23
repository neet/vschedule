import dayjs from 'dayjs';
import * as uuid from 'uuid';

import { actorFixture } from '../../__fixtures__/actor';
import { Url } from '../Url';
import { Uuid } from '../Uuid';
import { Stream } from './Stream';
import { StreamDescription } from './StreamDescription';
import { StreamTitle } from './StreamTitle';

describe('Stream', () => {
  it('constructs', () => {
    const id = uuid.v4();
    const stream = Stream.from({
      id: Uuid.from(id),
      title: StreamTitle.from('#NJU歌謡祭2021 / 後半'),
      url: Url.from('https://www.youtube.com/watch?v=TT5b3BzsZyI'),
      description: StreamDescription.from(
        `総勢58名のライバーが出演するにじさんじのユニット歌謡祭です。いつもお馴染みのユニットや少しレアなユニットも…？`,
      ),
      actor: actorFixture,
      createdAt: dayjs('2021-01-01T00:00:00+09:00'),
      updatedAt: dayjs('2021-01-01T00:00:00+09:00'),
      startedAt: dayjs('2021-01-01T00:00:00+09:00'),
      endedAt: dayjs('2021-01-02T00:00:00+09:00'),
    });

    expect(stream.title).toBe('#NJU歌謡祭2021 / 後半');
    expect(stream.duration?.humanize()).toBe('a day');
  });
});
