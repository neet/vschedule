import classNames from 'classnames';
import { ActiveLivers } from '../ActiveLivers';
import { Clock } from '../Clock';
import { UpcomingEvents } from '../UpcomingEvents';

export const Skyscraper = (): JSX.Element => {
  return (
    <aside
      aria-label="サイドバー"
      className={classNames(
        'relative',
        'flex-shrink-0',
        'overflow-scroll',
        'space-y-4',
        'hidden',
        'md:block',
        'md:w-60',
        'lg:w-72',
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

      <section aria-label="配信中のライバー一覧">
        <ActiveLivers />
      </section>

      <section aria-labelledby="skyscraper__upcoming">
        <UpcomingEvents />
      </section>
    </aside>
  );
};
