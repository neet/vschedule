import dayjs from 'dayjs';
import { memo } from 'react';

import type { Stream as StreamModel } from '../../../api/model/stream';
import { useAutoplay } from '../../hooks/useAutoplay';
import { useNow } from '../../hooks/useNow';
import type { EntryVariant } from '../../ui/Entry';
import { Entry } from '../../ui/Entry';
import type { EntryLayout } from '../../ui/Entry/Entry';

export type EventProps = Readonly<JSX.IntrinsicElements['a']> & {
  readonly stream: StreamModel;
  readonly variant?: EntryVariant;
  readonly layout?: EntryLayout;
  readonly embedType?: 'always' | 'interaction' | 'never';
  readonly pinned?: boolean;
};

const StreamPure = (props: EventProps): JSX.Element => {
  const { stream, variant, embedType = 'interaction', layout, ...rest } = props;

  const now = useNow();
  const { autoplayEnabled } = useAutoplay();

  const startedAt = dayjs(props.stream.startedAt);
  const endedAt = props.stream.endedAt ? dayjs(props.stream.endedAt) : null;

  const isStreaming =
    endedAt == null ||
    ((startedAt.isBefore(now) || startedAt.isSame(now)) &&
      (endedAt.isAfter(now) || endedAt.isSame(now)));

  const videoId = stream.url.split('?v=')[1];
  const embed = videoId && (
    <iframe
      title={stream.title}
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
      title={stream.title}
      url={stream.url}
      author={stream.owner.name}
      description={stream.description ?? ''}
      thumbnail={{
        url: stream.thumbnail?.url ?? '',
        alt: stream.title,
        blurDataUrl: stream.thumbnail?.base64,
      }}
      tag={undefined}
      date={new Date(stream.startedAt)}
      active={isStreaming}
      embed={embed}
      embedType={!autoplayEnabled ? 'never' : embedType}
      {...rest}
    />
  );
};

export const Stream = memo(StreamPure);
