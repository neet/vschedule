import { useUpcomingEvents } from '../../hooks/useUpcomingEvents';
import { Card } from '../../ui/Card';
import { Entry } from '../../ui/Entry';
import { Event } from '../Event';

export const UpcomingEvents = (): JSX.Element => {
  const upcoming = useUpcomingEvents();

  return (
    <>
      <h2 id="skyscraper__upcoming" className="sr-only">
        今後の配信予定
      </h2>

      {upcoming ? (
        <ul className="space-y-4">
          {upcoming.map((event) => (
            <li key={event.id}>
              <Card className="bg-coolGray-100 dark:bg-trueGray-900">
                <Event event={event} />
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Card
              key={`placeholder-${i}`}
              className="bg-coolGray-100 dark:bg-trueGray-900"
            >
              <Entry loading />
            </Card>
          ))}
        </div>
      )}
    </>
  );
};
