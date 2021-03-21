import type { Event as APIEvent } from '../../../types';
import { Card } from '../../ui/Card';
import { Entry } from '../../ui/Entry';
import { Event } from '../Event';

const Item = (props: { readonly event: APIEvent }): JSX.Element => {
  const { event } = props;

  const handleClickEvent = (): void => {
    gtag('event', 'click_upcoming_event', {
      event_label: event.name,
    });
  };

  return (
    <Card variant="wash">
      <Event event={event} onClick={handleClickEvent} />
    </Card>
  );
};

export interface UpcomingEventsProps {
  readonly upcomingEvents?: readonly APIEvent[];
}

export const UpcomingEvents = (props: UpcomingEventsProps): JSX.Element => {
  const { upcomingEvents } = props;

  return (
    <>
      <h2 id="skyscraper__upcoming" className="sr-only">
        今後の配信予定
      </h2>

      {upcomingEvents ? (
        <ul className="space-y-4">
          {upcomingEvents.map((event) => (
            <li key={event.id}>
              <Item event={event} />
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
