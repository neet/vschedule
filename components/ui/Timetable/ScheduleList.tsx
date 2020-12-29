import classNames from 'classnames';
import type { Dayjs } from 'dayjs';
import { Fragment, useMemo } from 'react';

import { inRange } from '../../../utils/inRange';
import { isOverlapping } from '../../../utils/overlap';
import { Spell } from './Spell';
import { TableData } from './TableData';
import type { Schedule } from './Timetable';
import { useTimetable } from './useTimetable';

export interface ScheduleListProps {
  readonly schedules: Schedule[];
}

interface OrderedSchedule {
  readonly schedule: Schedule;
  readonly row: number;
}

// let A = schedule[]
// 1. Aを畳み込み、アキュムレーターに時刻が重なるイベントがなければpush
// 2. 畳み込みの結果に格納されていない要素だけを集めた配列 A'を作成
// A'を第一引数、Aをsortedとマージして第２引数にし、末尾再帰
// 計算量: O(n^2)
const orderSchedule = (
  schedules: Schedule[],
  ordered: OrderedSchedule[] = [],
  row = 0,
): OrderedSchedule[] => {
  if (schedules.length === 0) return ordered;

  const uniques = schedules.reduce((xs, a) => {
    const overlapped = xs.some((b) => {
      return isOverlapping(
        [a.startAt, a.endAt],
        [b.schedule.startAt, b.schedule.endAt],
      );
    });

    if (overlapped) return xs;
    return xs.concat({ schedule: a, row });
  }, [] as OrderedSchedule[]);

  const dupes = schedules.filter(
    (v) => !uniques.map((o) => o.schedule).includes(v),
  );

  return orderSchedule(dupes, ordered.concat(uniques), row + 1);
};

const createDateSequence = (startAt: Dayjs, endAt: Dayjs, interval: number) => {
  const length = endAt.diff(startAt, 'minute') / interval;

  return Array.from({ length }, (_, i) => {
    const basis = startAt.clone();
    return basis.add(i * interval, 'minute');
  });
};

type Segment = { date: Dayjs; schedules: OrderedSchedule[] };

// 垂直方向にチャンクにするイメージ。
const chunkByInterval = (
  schedules: OrderedSchedule[],
  interval: number,
): Segment[] => {
  const dates =
    schedules.length !== 0
      ? createDateSequence(
          schedules[0].schedule.startAt,
          schedules[schedules.length - 1].schedule.endAt,
          interval,
        )
      : [];

  return dates.flatMap((date) => {
    return {
      date: date,
      schedules: schedules.filter((schedule) =>
        inRange(
          date,
          date.clone().add(interval, 'minute'),
          schedule.schedule.startAt,
        ),
      ),
    };
  }) as Segment[];
};

interface EmptyListProps {
  date: Dayjs;
}

const EmptyList = (props: EmptyListProps) => {
  const { date } = props;

  const { getItemX } = useTimetable();

  // Do not remove this;
  // though this component is totally hidden from the screen,
  // some users such as screen readers reads the inner content
  // so we are setting the coordinates to prevent the SRs to scroll
  // back to the origin (0, 0)
  const style = {
    transform: `translateX(${getItemX(date)}px)`,
  };

  return (
    <div className={classNames('absolute', 'top-0', 'left-0')} style={style}>
      <p className={classNames('sr-only')}>配信予定はありません</p>
    </div>
  );
};

interface TableDataListProps {
  segment: OrderedSchedule[];
}

const TableDataList = (props: TableDataListProps) => {
  const { segment } = props;
  const herald = segment[0].schedule.startAt;

  const { getWidth, getItemX, getItemY } = useTimetable();

  return (
    <ul
      className={classNames('absolute', 'top-0', 'left-0', 'z-50', 'mt-14')}
      style={{
        transform: `translateX(${getItemX(herald)}px)`,
      }}
    >
      {segment.map(({ schedule, row }, i) => (
        <li
          key={`item-${i}-${row}`}
          data-row={row}
          className={classNames('absolute', 'top-0', 'left-0')}
          style={{
            transform: `translate(
              ${getWidth(schedule.startAt.diff(herald, 'millisecond'))}px,
              ${getItemY(row)}px
            )`,
          }}
        >
          <TableData schedule={schedule} />
        </li>
      ))}
    </ul>
  );
};

export const ScheduleList = (props: ScheduleListProps): JSX.Element => {
  const { schedules } = props;
  const { interval } = useTimetable();

  const segments = useMemo(() => {
    return chunkByInterval(
      orderSchedule(schedules).sort((a, b) =>
        a.schedule.startAt.diff(b.schedule.startAt, 'millisecond'),
      ),
      interval,
    );
  }, [schedules, interval]);

  return (
    <>
      {segments.map((segment, i) => (
        <Fragment key={`segment-${i}`}>
          <Spell key={segment.date.toISOString()} date={segment.date} />
          {segment.schedules.length > 0 ? (
            <TableDataList segment={segment.schedules} />
          ) : (
            <EmptyList key={`message-${i}`} date={segment.date} />
          )}
        </Fragment>
      ))}
    </>
  );
};
