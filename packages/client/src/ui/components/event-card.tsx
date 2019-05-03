import React from 'react';
import { Event } from 'shared/entities/event';
import { styled, css } from 'client/ui/styles';
import * as querystring from 'querystring';
import { getThumbnailImageUrl } from 'client/ui/helpers/get-thumbnail-image-url';
import dayjs from 'dayjs';
import { useNow } from 'client/ui/hooks/use-now';

export interface EventCard {
  event: Event;
}

interface WrapperProps {
  isStreaming: boolean;
}

export const Thumbnail = styled.div`
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 112px;
  height: 63px;
  margin-right: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.borderNormal};
  background-position: center;
  background-size: cover;
`;

export const Wrapper = styled.a<WrapperProps>`
  display: flex;
  align-items: center;
  padding: 8px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.borderNormal};
  opacity: ${({ isStreaming }) => (isStreaming ? 1 : 0.5)};

  &:hover {
    text-decoration: none;
  }

  ${({ isStreaming }) =>
    isStreaming &&
    css`
      ${Thumbnail}::after {
        content: '';
        display: block;
        position: absolute;
        /* ↓ negate((width / 2) + border-width) */
        top: -9px;
        right: -9px;
        width: 12px;
        height: 12px;
        border: 3px solid ${({ theme }) => theme.backgroundNormal};
        border-radius: 50%;
        background-color: ${({ theme }) => theme.highlightNormal};
      }
    `}
`;

export const Meta = styled.div`
  flex-grow: 1;
  min-width: 0;
`;

const Title = styled.span`
  display: block;
  width: 100%;
  overflow: hidden;
  color: ${({ theme }) => theme.foregroundNormal};
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Time = styled.time`
  color: ${({ theme }) => theme.foregroundLight};
`;

export const EventCard = (props: EventCard) => {
  const { event } = props;
  const { now } = useNow();

  const startDate = dayjs(event.start_date);
  const endDate = dayjs(event.end_date);
  const fromNow = startDate.from(now);

  const isStreaming =
    (startDate.isBefore(now) || startDate.isSame(now)) && endDate.isAfter(now);

  const videoId = querystring.parse(event.url.split('?')[1]).v as string;
  const thumbnailImageUrl = getThumbnailImageUrl(videoId);
  const textForScreenReader =
    event.name + ' ' + event.liver.name + ' ' + event.description;

  return (
    <Wrapper
      href={event.url}
      target="__blank"
      rel="norefferer"
      title={event.name}
      tabIndex={0}
      aria-label={textForScreenReader}
      isStreaming={isStreaming}
    >
      <Thumbnail style={{ backgroundImage: `url(${thumbnailImageUrl})` }} />

      <Meta>
        <Title>{event.name}</Title>
        <Time dateTime={event.start_date}>{fromNow}</Time>
      </Meta>
    </Wrapper>
  );
};
