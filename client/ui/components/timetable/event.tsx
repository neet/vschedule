import React, { useMemo, useCallback } from 'react';
import { Event } from 'shared/entities/event';
import { styled } from 'client/ui/styles';
import dayjs, { Dayjs } from 'dayjs';
import { opacify, parseToRgb } from 'polished';

export interface EventBadgeProps {
  event: Event;
  basisDate: Dayjs;
  offset: number;
  gridWidth: number;
}

interface BadgeProps {
  isLight: boolean;
}

export const Badge = styled.a<BadgeProps>`
  display: flex;
  position: absolute;
  top: 79px;
  left: 0;
  box-sizing: border-box;
  align-items: center;
  padding: 4px 6px;
  border-radius: 99px;
  color: ${({ theme, isLight }) =>
    isLight ? theme.foregroundDark : theme.foregroundReverse};

  &:hover {
    text-decoration: none;
  }
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 4px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

export const Meta = styled.div`
  min-width: 0;
`;

export const Title = styled.h4`
  display: block;
  margin: 0;
  overflow: hidden;
  font-size: 14px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const LiverName = styled.span`
  display: block;
  overflow: hidden;
  opacity: 0.8;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EventBadge = (props: EventBadgeProps) => {
  const { event, basisDate, offset, gridWidth } = props;

  const convertMinuteToPixel = useCallback((minute: number) => {
    // Width of the grid of the timeline in pixel
    // 1 grid represents 1 hour
    const perMinute = gridWidth / 30;

    return minute * perMinute;
  }, []);

  const xyCoord = useMemo(() => {
    // Compare current date vs start date in minutes
    const diff = dayjs(event.start_date).diff(basisDate, 'minute');
    const x = convertMinuteToPixel(diff) + 18;

    const BADGE_HEIGHT = 50 + 18;
    const y = BADGE_HEIGHT * offset;

    return [x, y];
  }, [event]);

  const width = useMemo(() => {
    const diff = dayjs(event.end_date).diff(event.start_date, 'minute');
    return convertMinuteToPixel(diff) - (18 * 2);
  }, [event]);

  const isLight = useMemo(() => {
    // Calc color brightness difference
    const { red, green, blue } = parseToRgb(event.liver.color);
    return red * 0.299 + green * 0.587 + blue * 0.114 > 186;
  }, [event]);

  return (
    <Badge
      tabIndex={0}
      href={event.url}
      target="__blank"
      rel="noreferrer"
      isLight={isLight}
      style={{
        width: `${width}px`,
        transform: `translate(${xyCoord[0]}px, ${xyCoord[1]}px)`,
        backgroundColor: event.liver.color,
        boxShadow: `0 2px 6px ${opacify(0.48, event.liver.color)}`,
      }}
    >
      <Avatar src={event.liver.avatar} />

      <Meta>
        <Title>{event.name}</Title>
        <LiverName>{event.liver.name}</LiverName>
      </Meta>
    </Badge>
  );
};
