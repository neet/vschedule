import { useMemo } from 'react';
import { TableData } from './TableData';
import { Schedule } from './Timetable';
import { isOverlapping } from '../../utils/overlap';
import { inRange } from '../../utils/inRange';
import type { Dayjs } from 'dayjs';
import { Spell } from './Spell';
import { useTimetable } from './context';

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

interface Separator {
  type: 'separator';
  date: Dayjs;
}

const createDateSequence = (startAt: Dayjs, endAt: Dayjs, interval: number) => {
  const length = endAt.diff(startAt, 'minute') / interval;

  return Array.from({ length }, (_, i) => {
    const basis = startAt.clone();
    return basis.add(i * interval, 'minute');
  });
};

type Segment = OrderedSchedule[] | Separator;

// 垂直方向にチャンクにするイメージ。
const chunkByInterval = (
  schedules: OrderedSchedule[],
  interval: number,
): Segment[] => {
  const dates = createDateSequence(
    schedules[0].schedule.startAt,
    schedules[schedules.length - 1].schedule.endAt,
    interval,
  );

  return dates.flatMap((date) => {
    return [
      {
        type: 'separator',
        date: date,
      },
      schedules.filter((schedule) =>
        inRange(
          date,
          date.clone().add(interval, 'minute'),
          schedule.schedule.startAt,
        ),
      ),
    ] as Segment[];
  });
};

export const ScheduleList = (props: ScheduleListProps): JSX.Element => {
  const { schedules } = props;
  const { getWidth, getItemX, getItemY, interval } = useTimetable();

  const segments = useMemo(() => {
    return chunkByInterval(
      orderSchedule(schedules).sort((a, b) =>
        a.schedule.startAt.diff(b.schedule.startAt, 'millisecond'),
      ),
      interval,
    );
  }, [schedules, interval]);

  return (
    <div className="h-full w-full absolute top-0 left-0">
      {segments.map((segment, i) =>
        'type' in segment ? (
          <Spell key={segment.date.toISOString()} date={segment.date} />
        ) : segment.length === 0 ? (
          <p key={`msg-${i}`} className="sr-only fixed bottom-0 right-0">
            配信予定はありません
          </p>
        ) : (
          <ul
            key={`row-${i}`}
            className="absolute top-0 left-0 z-10 mt-14"
            style={{
              transform: `translateX(${getItemX(
                segment[0].schedule.startAt,
              )}px)`,
            }}
          >
            {segment.map(({ schedule, row }) => (
              <li
                key={`item-${i}-${row}`}
                data-row={row}
                className="absolute top-0 left-0"
                style={{
                  // X: relative to segment[0]'s X
                  transform: `translate(${getWidth(
                    schedule.startAt.diff(
                      segment[0].schedule.startAt,
                      'millisecond',
                    ),
                  )}px, ${getItemY(row)}px)`,
                }}
              >
                <TableData schedule={schedule} />
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
};
