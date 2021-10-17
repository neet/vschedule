import classNames from 'classnames';

import type { Event } from '../../../types';
import { isWindows } from '../../../utils/isWindows';
import { ActiveLivers } from '../ActiveLivers';
import { Clock } from '../Clock';
import { SearchButton } from '../SearchButton';
import { UpcomingEvents } from '../UpcomingEvents';

export interface SkyscraperProps {
  readonly events?: readonly Event[];
  readonly loading?: boolean;
  readonly pinnedEventId?: number;
  readonly upcomingEvents?: readonly Event[];
}

export const Skyscraper = (props: SkyscraperProps): JSX.Element => {
  const { events, loading, upcomingEvents, pinnedEventId } = props;

  return (
    <aside
      aria-label="サイドバー"
      className={classNames(
        'relative',
        'flex-shrink-0',
        'overflow-y-scroll',
        'overflow-x-hidden',
        'space-y-4',
        'hidden',
        'md:block',
        'md:w-60',
        'lg:w-72',
        isWindows() && [
          'scrollbar-thin',
          'scrollbar-thumb-rounded-md',
          'scrollbar-thumb-trueGray-200',
          'scrollbar-track-trueGray-100',
          'dark:scrollbar-thumb-trueGray-700',
          'dark:scrollbar-track-trueGray-800',
        ],
      )}
    >
      <section
        className="bg-white dark:bg-black sticky top-0 left-0 z-10"
        aria-labelledby="skyscraper__clock"
      >
        <h2 className="sr-only" id="skyscraper__clock">
          現在時刻
        </h2>
        <Clock />
      </section>

      <section aria-label="検索">
        <SearchButton events={events} loading={loading} />
      </section>

      <section aria-label="配信中のライバー一覧">
        <ActiveLivers upcomingEvents={upcomingEvents} />
      </section>

      <section aria-labelledby="skyscraper__upcoming">
        <UpcomingEvents
          id="skyscraper__upcoming"
          pinnedEventId={pinnedEventId}
          upcomingEvents={upcomingEvents}
        />
      </section>
    </aside>
  );
};
