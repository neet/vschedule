import Head from 'next/head';
import dayjs from 'dayjs';
import { useEvents } from '../hooks/useEvents';
import { Timetable } from '../ui/Timetable';
import { EventMarker } from '../components/EventMarker';
import { Skyscraper } from '../components/Skyscraper';
import { GettingStarted } from '../components/GettingStarted';
import { useTutorial } from '../hooks/useTutorial';
import { Layout } from '../components/Layout';

const Events = (): JSX.Element => {
  const { data } = useEvents();
  const { hasTutorialDone, setTutorialStatus } = useTutorial();

  return (
    <Layout variant="single">
      <Head>
        <title>にじさんじの配信一覧 | Refined Itsukara.link</title>
      </Head>

      {data != null ? (
        <Timetable
          scale={5}
          interval={30}
          itemHeight={60}
          startAt={dayjs(data.data.events[0].start_date)}
          endAt={dayjs(data.data.events[data.data.events.length - 1].end_date)}
          schedules={data.data.events.map((event) => ({
            startAt: dayjs(event.start_date),
            endAt: dayjs(event.end_date),
            node: <EventMarker event={event} />,
          }))}
        >
          <div className="flex-shrink-0 w-72 overflow-scroll max-h-full hidden xl:block">
            <Skyscraper />
          </div>
        </Timetable>
      ) : (
        <span aria-busy>loading</span>
      )}

      {!hasTutorialDone && typeof window !== 'undefined' && (
        <GettingStarted onComplete={() => setTutorialStatus(true)} />
      )}
    </Layout>
  );
};

export default Events;
