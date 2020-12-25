import dayjs from 'dayjs';
import { useNow } from '../../hooks/useNow';
import { Event as APIEvent } from '../../types';
import { Entry, EntryVariant } from '../../ui/Entry';

export interface EventProps {
  readonly event: APIEvent;
  readonly variant?: EntryVariant;
}

export const Event = (props: EventProps): JSX.Element => {
  const { event, variant } = props;

  const now = useNow();
  const startAt = dayjs(props.event.start_date);
  const endAt = dayjs(props.event.end_date);

  const isStreaming =
    (startAt.isBefore(now) || startAt.isSame(now)) &&
    (endAt.isAfter(now) || endAt.isSame(now));

  return (
    <Entry
      variant={variant}
      title={event.name}
      url={event.url}
      author={event.livers.map((liver) => liver.name).join(', ')}
      description={event.description}
      thumbnail={event.thumbnail}
      thumbnailAlt={event.name}
      tag={event.genre?.name}
      date={new Date(event.start_date)}
      active={isStreaming}
    />
  );
};
