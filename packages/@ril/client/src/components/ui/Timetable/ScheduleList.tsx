import classNames from 'classnames';
import type { Dayjs } from 'dayjs';
import { Fragment, memo, useMemo } from 'react';

import { inRange } from '../../../utils/inRange';
import { isOverlapping } from '../../../utils/overlap';
import type { OrderedSchedule, Schedule, Segment } from './models';
import { Spell } from './Spell';
import { TableData } from './TableData';
import { useTimetable } from './useTimetable';

export interface ScheduleListProps {
  readonly schedules: readonly Schedule[];
}

// let A = schedule[]
// 1. Aを畳み込み、アキュムレーターに時刻が重なるイベントがなければpush
// 2. 畳み込みの結果に格納されていない要素だけを集めた配列 A'を作成
// A'を第一引数、Aをsortedとマージして第２引数にし、末尾再帰
// 計算量: O(n^2)
const orderSchedule = (
  schedules: readonly Schedule[],
  ordered: readonly OrderedSchedule[] = [],
  row = 0,
): OrderedSchedule[] => {
  if (schedules.length === 0) return ordered.concat();

  const uniques = schedules.reduce<readonly OrderedSchedule[]>((xs, a) => {
    const overlapped = xs.some((b) => {
      return isOverlapping(
        [a.startAt, a.endAt],
        [b.schedule.startAt, b.schedule.endAt],
      );
    });

    if (overlapped) return xs;
    return xs.concat({ schedule: a, row });
  }, []);

  const dupes = schedules.filter(
    (v) => !uniques.map((o) => o.schedule).includes(v),
  );

  return orderSchedule(dupes, ordered.concat(uniques), row + 1);
};

const createDateSequence = (
  startAt: Readonly<Dayjs>,
  endAt: Readonly<Dayjs>,
  interval: number,
): readonly Readonly<Dayjs>[] => {
  // 植木算
  const length = endAt.diff(startAt, 'minute') / interval + 1;

  return Array.from({ length }, (_, i) => {
    const basis = startAt.clone();
    return basis.add(i * interval, 'minute');
  });
};

// 垂直方向にチャンクにするイメージ。
const chunkByInterval = (
  schedules: readonly OrderedSchedule[],
  interval: number,
): Segment[] => {
  const head = schedules[0];
  const tail = schedules[schedules.length - 1];

  const dates =
    head != null && tail != null
      ? createDateSequence(head.schedule.startAt, tail.schedule.endAt, interval)
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
  readonly date: Readonly<Dayjs>;
}

const EmptyList = (props: EmptyListProps): JSX.Element => {
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
  readonly segment: readonly OrderedSchedule[];
}

const TableDataList = (props: TableDataListProps): JSX.Element | null => {
  const { segment } = props;
  const beginning = segment[0]?.schedule.startAt;

  const { getWidth, getItemX, getItemY } = useTimetable();

  if (beginning == null) {
    return null;
  }

  return (
    <ul
      className={classNames('absolute', 'top-0', 'left-0', 'z-50', 'mt-14')}
      style={{
        transform: `translateX(${getItemX(beginning)}px)`,
      }}
    >
      {segment.map(({ schedule, row }, i) => (
        <li
          key={`item-${i}-${row}`}
          data-row={row}
          className={classNames('absolute', 'top-0', 'left-0')}
          style={{
            transform: `translate(
              ${getWidth(schedule.startAt.diff(beginning, 'millisecond'))}px,
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

const ScheduleListPure = (props: ScheduleListProps): JSX.Element => {
  const { schedules } = props;
  const { interval } = useTimetable();

  const segments = useMemo(() => {
    const ordered = orderSchedule(schedules).sort((a, b) =>
      a.schedule.startAt.diff(b.schedule.startAt, 'millisecond'),
    );

    return chunkByInterval(ordered, interval);
  }, [schedules, interval]);

  const largestSegmentSize = useMemo(
    () =>
      segments
        .flatMap((segment) => segment.schedules)
        .reduce((last, schedule) => Math.max(schedule.row, last), 0) + 1,
    [segments],
  );

  return (
    <>
      {segments.map((segment, i) => (
        <Fragment key={`segment-${i}`}>
          <Spell
            key={segment.date.toISOString()}
            date={segment.date}
            size={largestSegmentSize}
          />

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

export const ScheduleList = memo(ScheduleListPure);
