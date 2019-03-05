import React, { useMemo, useCallback } from 'react';
import { styled } from '../styles';
import * as querystring from 'querystring';
import { Event } from '../../../shared/entities/event';

export interface SidebarProps {
  events: Event[];
}

const Wrapper = styled.aside`
  width: 300px;
`;

// Move to indivisual file
const SidebarItem = (props: { event: Event }) => {
  const { event } = props;

  const makeThumbnailUrl = useCallback(
    (videoId: string) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    [],
  );

  const thumbnailImageUrl = useMemo(() => {
    const videoId = querystring.parse(event.url.split('?')[1]).v as string;
    return makeThumbnailUrl(videoId);
  }, [event]);

  return (
    <div>
      <img src={thumbnailImageUrl} alt={event.name} />
    </div>
  );
};

export const Sidebar = (props: SidebarProps) => {
  const { events } = props;

  return (
    <Wrapper>
      {events.map(event => (
        <SidebarItem key={event.id} event={event} />
      ))}
    </Wrapper>
  );
};
