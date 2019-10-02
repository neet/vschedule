import dayjs from 'dayjs';
import { opacify, parseToRgb } from 'polished';
import React, { useCallback, useMemo } from 'react';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { borderGap, markerGap } from 'src/styles/constants';

export interface MarkerProps {
  activity: ActivityFragment;
  row: number;
  startDate: dayjs.Dayjs;
}

interface WrapperProps {
  isLight: boolean;
}

export const Wrapper = styled.a<WrapperProps>`
  display: flex;
  position: absolute;
  top: 115px;
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

export const Marker = (props: MarkerProps) => {
  const { activity, startDate: basisDate, row } = props;

  const firstStreamer = activity.performers[0];
  const startDate = dayjs(activity.startAt);
  const endDate = dayjs(activity.endAt);

  const convertMinuteToPixel = useCallback((minute: number) => {
    const pixelPerMinute = borderGap / 30;

    return minute * pixelPerMinute;
  }, []);

  // Compare current date vs start date in minutes
  const x =
    convertMinuteToPixel(startDate.diff(basisDate, 'minute')) + markerGap / 2;

  // Avatar height + padding
  const y = (markerGap + 50) * row;

  const width =
    convertMinuteToPixel(endDate.diff(startDate, 'minute')) - markerGap;

  const isLight = useMemo(() => {
    // Calc color brightness difference
    const { red, green, blue } = parseToRgb(firstStreamer.color);

    return red * 0.299 + green * 0.587 + blue * 0.114 > 186;
  }, [activity]);

  return (
    <Wrapper
      tabIndex={0}
      href={activity.url}
      title={activity.name}
      target="_blank"
      rel="noreferrer"
      isLight={isLight}
      style={{
        width: `${width}px`,
        transform: `translate(${x}px, ${y}px)`,
        backgroundColor: firstStreamer.color,
        boxShadow: `0 2px 6px ${opacify(0.48, firstStreamer.color)}`,
      }}
    >
      <Avatar src={firstStreamer.avatar} />

      <Meta>
        <Title>{activity.name}</Title>
        <LiverName>{firstStreamer.name}</LiverName>
      </Meta>
    </Wrapper>
  );
};