import { useMemo } from 'react';

import type { Event as APIEvent } from '../../../types';
import { Card } from '../../ui/Card';
import { Entry } from '../../ui/Entry';
import { Event } from '../Event';

const Item = (props: {
  readonly event: APIEvent;
  readonly pinned: boolean;
}): JSX.Element => {
  const { event, pinned } = props;

  const handleClickEvent = (): void => {
    gtag('event', 'click_upcoming_event', {
      event_label: event.name,
    });
  };

  return (
    <Card variant={pinned ? 'primary' : 'wash'}>
      <Event event={event} pinned={pinned} onClick={handleClickEvent} />
    </Card>
  );
};

const sortByPriority = (pinned?: number) => (
  a: APIEvent,
  b: APIEvent,
): number => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (pinned === a.id) return -999;
  const deltaT =
    new Date(a.start_date).valueOf() - new Date(b.start_date).valueOf();
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return Math.max(-1, Math.min(1, deltaT));
};

export interface UpcomingEventsProps {
  readonly pinnedEventId?: number;
  readonly upcomingEvents?: readonly APIEvent[];
}

export const UpcomingEvents = (props: UpcomingEventsProps): JSX.Element => {
  const { pinnedEventId } = props;

  const upcomingEvents = useMemo(() => {
    if (props.upcomingEvents == null) return;
    return [...props.upcomingEvents].sort(sortByPriority(pinnedEventId));
  }, [pinnedEventId, props.upcomingEvents]);

  return (
    <>
      <h2 id="skyscraper__upcoming" className="sr-only">
        今後の配信予定
      </h2>

      {upcomingEvents ? (
        <ul className="space-y-4">
          {upcomingEvents.map((event) => (
            <li key={event.id}>
              <Item event={event} pinned={pinnedEventId === event.id} />
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
