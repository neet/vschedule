import useAspidaSWR from '@aspida/swr';
import classNames from 'classnames';
import dayjs from 'dayjs';
import type { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import { Section } from 'react-headings';
import { useSearchParam } from 'react-use';

import { api as apiLegacy } from '../api-legacy';
import { client } from '../client';
import { ChangeLog } from '../components/app/ChangeLog';
import { Crown } from '../components/app/Crown';
import { Skyscraper } from '../components/app/Skyscraper';
import { StreamMarker } from '../components/app/StreamMarker';
import { Tutorial } from '../components/app/Tutorial';
import { useGenres } from '../components/hooks/useGenres';
import { useSwapDelta } from '../components/hooks/useSwapDelta';
import { useUpcomingEvents } from '../components/hooks/useUpcomingEvents';
import Single from '../components/layouts/Single';
import type { TimetableProps } from '../components/ui/Timetable';
import { TimetableProvider } from '../components/ui/Timetable';
import type { GenresResponse } from '../types';

const Timetable = dynamic<TimetableProps>(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  async () => import('../components/ui/Timetable').then((m) => m.Timetable),
  { ssr: false },
);

const GENRE_ALL = -1;
const DAILY = 86400;

// if you use this hook other than here, make this a module.
const useGenreQueryParam = (): number | undefined => {
  const queryGenre = useSearchParam('genre');
  return queryGenre != null ? Number(queryGenre) : undefined;
};

export interface StreamsProps {
  readonly data: GenresResponse;
}

export const getStaticProps: GetStaticProps<StreamsProps> = async () => {
  return {
    props: {
      // data: await apiLegacy.fetchGenres(),
    },
    revalidate: DAILY,
  };
};

const since = dayjs().subtract(1, 'day').toISOString();
const until = dayjs().add(1, 'day').toISOString();

const Streams = (props: StreamsProps): JSX.Element | null => {
  const { data: streams, isValidating } = useAspidaSWR(client.rest.v1.streams, {
    query: { since, until },
  });

  const upcomingEvents = useUpcomingEvents();
  const genreQuery = useGenreQueryParam();
  const [genre, setGenre] = useState(genreQuery ?? GENRE_ALL);
  // const { genres } = useGenres({ fallbackData: props.data });
  const [swapDelta] = useSwapDelta();

  // prettier-ignore
  const schedules = useMemo(() => (
   streams
      // ?.filter((stream) => genre === GENRE_ALL || stream.genre?.id === genre)
      ?.map((stream) => ({
        startAt: dayjs(stream.startedAt),
        endAt: stream.endedAt != null ? dayjs(stream.endedAt) : dayjs(stream.startedAt).add(1, 'hour'),
        node: <StreamMarker stream={stream} />,
      }))
    ?? []
  ), [streams]);

  const head = streams?.at(-1);
  const tail = streams?.at(0);
  const startAt = head != null ? dayjs(head.startedAt) : dayjs();
  const endedAt =
    tail?.endedAt != null
      ? dayjs(tail.endedAt)
      : dayjs(tail?.startedAt).add(1, 'day');

  // console.log({ schedules });

  return (
    <>
      <Head>
        <title>にじさんじの配信一覧 | Refined Itsukara.link</title>
        <meta
          name="description"
          content="にじさんじライバーの最近の配信の一覧です"
        />
      </Head>
      <TimetableProvider
        startAt={startAt}
        endAt={endedAt}
        interval={30}
        scale={5}
        itemHeight={61.5}
      >
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
          <div className="flex flex-col grow space-y-2 md:space-y-4">
            <Section
              component={
                <Crown
                  genre={genre}
                  loading={isValidating}
                  onGenreChange={setGenre}
                  genres={[]}
                />
              }
            >
              <Timetable
                loading={streams == null}
                swapDelta={swapDelta}
                schedules={schedules}
              />
            </Section>
          </div>

          <Skyscraper
            mode="streams"
            events={upcomingEvents}
            loading={isValidating}
            upcomingStreams={streams}
          />
        </div>
      </TimetableProvider>

      {typeof window !== 'undefined' && (
        <>
          <Tutorial />
          <ChangeLog />
        </>
      )}
    </>
  );
};

Streams.Layout = Single;

export default Streams;
