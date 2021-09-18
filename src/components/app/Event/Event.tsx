import dayjs from 'dayjs';
import { memo } from 'react';

import type { Event as APIEvent } from '../../../types';
import { useAutoplay } from '../../hooks/useAutoplay';
import { useNow } from '../../hooks/useNow';
import type { EntryVariant } from '../../ui/Entry';
import { Entry } from '../../ui/Entry';
import type { EntryLayout } from '../../ui/Entry/Entry';

export type EventProps = Readonly<JSX.IntrinsicElements['a']> & {
  readonly event: APIEvent;
  readonly variant?: EntryVariant;
  readonly layout?: EntryLayout;
  readonly embedType?: 'always' | 'interaction' | 'never';
  readonly pinned?: boolean;
};

const EventPure = (props: EventProps): JSX.Element => {
  const { event, variant, embedType = 'interaction', layout, ...rest } = props;

  const now = useNow();
  const { autoplayEnabled } = useAutoplay();

  const startAt = dayjs(props.event.start_date);
  const endAt = dayjs(props.event.end_date);

  const isStreaming =
    (startAt.isBefore(now) || startAt.isSame(now)) &&
    (endAt.isAfter(now) || endAt.isSame(now));

  const videoId = event.url.split('?v=')[1];
  const embed = videoId && (
    <iframe
      title={event.name}
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );

  return (
    <Entry
      variant={variant}
      layout={layout}
      title={event.name}
      url={event.url}
      author={event.livers.map((liver) => liver.name).join(', ')}
      description={event.description}
      thumbnail={event.thumbnail}
      thumbnailAlt={event.name}
      tag={event.genre?.name}
      date={new Date(event.start_date)}
      active={isStreaming}
      embed={embed}
      embedType={!autoplayEnabled ? 'never' : embedType}
      {...rest}
    />
  );
};

export const Event = memo(EventPure);
