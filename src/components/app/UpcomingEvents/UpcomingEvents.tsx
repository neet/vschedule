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
              <Card variant="wash">
                <Event event={event} />
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Card key={`placeholder-${i}`} variant="wash">
              <Entry loading />
            </Card>
          ))}
        </div>
      )}
    </>
  );
};
