import classNames from 'classnames';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { useLocalStorage, useSearchParam } from 'react-use';

import { ChangeLog } from '../components/app/ChangeLog';
import { Crown } from '../components/app/Crown';
import { EventMarker } from '../components/app/EventMarker';
import { Layout } from '../components/app/Layout';
import { Skyscraper } from '../components/app/Skyscraper';
import { Tutorial } from '../components/app/Tutorial';
import { useEvents } from '../components/hooks/useEvents';
import type { TimetableProps } from '../components/ui/Timetable';
import { TimetableProvider } from '../components/ui/Timetable';

const Timetable = dynamic<TimetableProps>(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  async () => import('../components/ui/Timetable').then((m) => m.Timetable),
  { ssr: false },
);

const GENRE_ALL = -1;

// if you use this hook other than here, make this a module.
const useGenreQueryParam = (): number | undefined => {
  const queryGenre = useSearchParam('genre');
  return queryGenre != null ? Number(queryGenre) : undefined;
};

const Events = (): JSX.Element => {
  const { data } = useEvents();
  const [swapDelta] = useLocalStorage<boolean>('swap-delta');
  const genreQuery = useGenreQueryParam();
  const [genre, setGenre] = useState(genreQuery ?? GENRE_ALL);

  const startAt = data ? dayjs(data.data.events[0].start_date) : dayjs();
  const endAt = data
    ? dayjs(data.data.events[data.data.events.length - 1].end_date)
    : dayjs();

  // prettier-ignore
  const schedules = useMemo(() => (
    data?.data.events
      .filter((event) => genre === GENRE_ALL || event.genre?.id === genre)
      .map((event) => ({
        startAt: dayjs(event.start_date),
        endAt: dayjs(event.end_date),
        node: <EventMarker event={event} />,
      }))
    ?? []
  ), [data, genre]);

  return (
    <Layout
      variant="single"
      title="にじさんじの配信一覧 | Refined Itsukara.link"
      description="にじさんじライバーの最近の配信の一覧です"
    >
      <TimetableProvider
        startAt={startAt}
        endAt={endAt}
        interval={30}
        scale={5}
        itemHeight={60}
      >
        <div
          className={classNames(
            'absolute', // TODO: separate
            'box-border',
            'flex',
            'top-0',
            'left-0',
            'p-2',
            'w-full',
            'h-full',
            'md:px-6',
            'md:py-4',
            'md:space-x-4',
          )}
        >
          <div className="flex flex-col flex-grow space-y-4">
            <Crown genre={genre} onGenreChange={setGenre} />
            <Timetable
              loading={data == null}
              swapDelta={swapDelta}
              schedules={schedules}
            />
          </div>
          <Skyscraper />
        </div>
      </TimetableProvider>

      {typeof window !== 'undefined' && (
        <>
          <Tutorial />
          <ChangeLog />
        </>
      )}
    </Layout>
  );
};

export default Events;
