import { useEvents } from '../../hooks/useEvents';
import { Card } from '../../ui/Card';
import { useTimetable } from '../../ui/Timetable';
import { Event } from '../../components/Event';
import { ActiveLivers } from '../../components/ActiveLivers';
import { Button } from '../../ui/Button';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export const Skyscraper = (): JSX.Element => {
  const { data } = useEvents();
  const { focusedAt, setFocusedAt } = useTimetable();

  // prettier-ignore
  const upcoming = useMemo(() => data.data.events.filter(
    (event) =>
      focusedAt.isBefore(event.end_date) ||
      focusedAt.isBefore(event.start_date),
  ), [data, focusedAt]);

  return (
    <aside aria-label="サイドバー" className="relative">
      <section
        className="bg-white dark:bg-black sticky top-0 left-0 z-10 pb-4"
        aria-labelledby="skyscraper__clock"
      >
        <h2 className="sr-only" id="skyscraper__clock">
          表示中の時刻
        </h2>

        <Card className="bg-coolGray-100 dark:bg-trueGray-900">
          <div className="flex items-center justify-between">
            <time
              className="text-coolGray-700 dark:text-trueGray-300 font-semibold text-4xl tabular-nums"
              dateTime={focusedAt.toISOString()}
            >
              {focusedAt.format('HH:mm')}
            </time>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setFocusedAt(dayjs())}
            >
              現在時刻に移動
            </Button>
          </div>
        </Card>
      </section>

      <section aria-label="配信中のライバー一覧">
        <ActiveLivers events={upcoming} />
      </section>

      <section aria-labelledby="skyscraper__upcoming">
        <h2 id="skyscraper__upcoming" className="sr-only">{`${focusedAt.format(
          'HH:mm',
        )}以降の配信予定`}</h2>

        <ul className="space-y-4">
          {upcoming.map((event) => (
            <li key={event.id}>
              <Card className="bg-coolGray-100 dark:bg-trueGray-900">
                <Event event={event} />
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};
