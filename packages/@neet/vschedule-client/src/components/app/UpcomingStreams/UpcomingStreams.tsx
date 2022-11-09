import { useMemo } from 'react';
import { H, Section } from 'react-headings';

import type { Stream as StreamModel } from '../../../api/model';
import { Card } from '../../ui/Card';
import { Entry } from '../../ui/Entry';
import { Stream } from '../Stream';

const Item = (props: { readonly stream: StreamModel }): JSX.Element => {
  const { stream } = props;

  const handleClickEvent = (): void => {
    gtag('event', 'click_upcoming_event', {
      event_label: stream.title,
    });
  };

  return (
    <Card variant="wash">
      <Stream stream={stream} onClick={handleClickEvent} />
    </Card>
  );
};

const sortByPriority = (a: StreamModel, b: StreamModel): number => {
  const deltaT =
    new Date(a.startedAt).valueOf() - new Date(b.startedAt).valueOf();
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return Math.max(-1, Math.min(1, deltaT));
};

export interface UpcomingStreamsProps {
  readonly id?: string;
  readonly pinnedEventId?: number;
  readonly upcomingStreams?: readonly StreamModel[];
}

export const UpcomingStreams = (props: UpcomingStreamsProps): JSX.Element => {
  const { id, pinnedEventId } = props;

  const upcomingStreams = useMemo(() => {
    if (props.upcomingStreams == null) return;
    return [...props.upcomingStreams].sort(sortByPriority);
  }, [pinnedEventId, props.upcomingStreams]);

  return (
    <Section
      component={
        <H id={id} className="sr-only">
          今後の配信予定
        </H>
      }
    >
      {upcomingStreams ? (
        <ul className="space-y-4">
          {upcomingStreams.map((stream) => (
            <li key={stream.id}>
              <Item stream={stream} />
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
    </Section>
  );
};
