import classNames from 'classnames';
import dayjs from 'dayjs';
import type { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { useLocalStorage, useSearchParam } from 'react-use';

import { api } from '../api';
import { ChangeLog } from '../components/app/ChangeLog';
import { Crown } from '../components/app/Crown';
import { EventMarker } from '../components/app/EventMarker';
import { Skyscraper } from '../components/app/Skyscraper';
import { Tutorial } from '../components/app/Tutorial';
import { useEvents } from '../components/hooks/useEvents';
import { useGenres } from '../components/hooks/useGenres';
import { useUpcomingEvents } from '../components/hooks/useUpcomingEvents';
import type { TimetableProps } from '../components/ui/Timetable';
import { useEndAt, useFocusedAt, useStartAt } from '../components/ui/Timetable';
import Single from '../layouts/Single';
import type { GenresResponse } from '../types';

const Timetable = dynamic<TimetableProps>(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  async () => import('../components/ui/Timetable').then((m) => m.Timetable),
  { ssr: false },
);

// if you use this hook other than here, make this a module.
const useGenreQueryParam = (): number | undefined => {
  const queryGenre = useSearchParam('genre');
  return queryGenre != null ? Number(queryGenre) : undefined;
};

const GENRE_ALL = -1;

export interface EventsProps {
  readonly data: GenresResponse;
}

export const getStaticProps: GetStaticProps<EventsProps> = async () => {
  const DAILY = 86400;

  return {
    props: {
      data: await api.fetchGenres(),
    },
    revalidate: DAILY,
  };
};

const Events = (props: EventsProps): JSX.Element => {
  const { events, loading } = useEvents();
  const upcomingEvents = useUpcomingEvents();
  const [swapDelta] = useLocalStorage<boolean>('swap-delta');
  const genreQuery = useGenreQueryParam();
  const [genre, setGenre] = useState(genreQuery ?? GENRE_ALL);
  const [, setStartAt] = useStartAt();
  const [, setEndAt] = useEndAt();
  const { genres } = useGenres({ initialData: props.data });
  const { focusedAt, setFocusedAt } = useFocusedAt();

  const startAt = events ? dayjs(events[0].start_date) : dayjs();
  const endAt = events ? dayjs(events[events.length - 1].end_date) : dayjs();

  // widen / narrow the timetable when events were updated
  useEffect(() => {
    setStartAt(startAt);
    setEndAt(endAt);
    // eslint-disable-next-line
  }, [events]);

  // "today" or "yesterday" "tomorrow" here are defined as relative from the focus
  const zeroAmToday = focusedAt.millisecond(0).second(0).minute(0).hour(0);
  const zeroAmTomorrow = zeroAmToday.add(1, 'day');
  const zeroAmYesterday = zeroAmToday.subtract(1, 'day');

  const handleClickLatest = (): void => {
    gtag('event', 'click_crown_latest', {
      event_label: '最新の配信へ移動',
    });

    void setFocusedAt(dayjs());
  };

  const handleClickNext = (): void => {
    gtag('event', 'click_crown_forward', {
      event_label: '一日前に移動',
    });

    // If focus is before the closest 0 AM
    if (focusedAt.isBefore(zeroAmToday)) {
      void setFocusedAt(zeroAmToday);
      return;
    }

    void setFocusedAt(dayjs.min(endAt, zeroAmTomorrow));
  };

  const handleClickPrev = (): void => {
    gtag('event', 'click_crown_forward', {
      event_label: '一日後に移動',
    });

    // If focus is after the closest 0 AM
    if (focusedAt.isAfter(zeroAmToday)) {
      void setFocusedAt(zeroAmToday);
      return;
    }

    void setFocusedAt(dayjs.max(startAt, zeroAmYesterday));
  };

  // prettier-ignore
  const schedules = useMemo(() => (
   events 
      ?.filter((event) => genre === GENRE_ALL || event.genre?.id === genre)
      .map((event) => ({
        startAt: dayjs(event.start_date),
        endAt: dayjs(event.end_date),
        node: <EventMarker event={event} />,
      }))
    ?? []
  ), [events, genre]);

  return (
    <>
      <Head>
        <title>にじさんじの配信一覧 | Refined Itsukara.link</title>
        <meta
          name="description"
          content="にじさんじライバーの最近の配信の一覧です"
        />
      </Head>
      <div
        className={classNames(
          'absolute', // TODO: separate
          'box-border',
          'flex',
          'top-0',
          'left-0',
          'py-2',
          'px-3',
          'w-full',
          'h-full',
          'md:px-6',
          'md:py-4',
          'md:space-x-4',
        )}
      >
        <div className="flex flex-col flex-grow space-y-2 md:space-y-4">
          <Crown
            genre={genre}
            loading={loading}
            focusedAt={focusedAt}
            genres={genres}
            prevDisabled={focusedAt.isSame(startAt)}
            nextDisabled={focusedAt.isSame(endAt)}
            onClickLatest={handleClickLatest}
            onGenreChange={setGenre}
            onClickPrev={handleClickPrev}
            onClickNext={handleClickNext}
          />

          <Timetable
            loading={events == null}
            swapDelta={swapDelta}
            schedules={schedules}
          />
        </div>
        <Skyscraper upcomingEvents={upcomingEvents} />
      </div>

      {typeof window !== 'undefined' && (
        <>
          <Tutorial />
          <ChangeLog />
        </>
      )}
    </>
  );
};

Events.Layout = Single;

export default Events;
