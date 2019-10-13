import dayjs from 'dayjs';
import { parseToRgb, rgba } from 'polished';
import React, { useMemo } from 'react';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { SPELL_WIDTH, MARKER_MARGIN } from './layout';

const toPixel = (minute: number) => {
  const pixelPerMinute = SPELL_WIDTH / 30;

  return minute * pixelPerMinute;
};

interface WrapperProps {
  isLight: boolean;
}

// const keyframe = keyframes`
//   0% {
//     transform: scale(0);
//   }
//   100% {
//     transform: scale(1);
//   }
// `;

// const KeyframeWrapper = styled.div`
//   animation: 0.15s ${keyframe} ease-out;
// `;

export const Wrapper = styled.a<WrapperProps>`
  display: flex;
  position: absolute;
  top: 60px;
  left: 0;
  box-sizing: border-box;
  align-items: center;
  padding: 4px 5px;
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

export interface MarkerProps {
  activity: ActivityFragment;
  row: number;
  timetableStartAt: dayjs.Dayjs;
}

export const Marker = (props: MarkerProps) => {
  const { activity, timetableStartAt, row } = props;

  const firstStreamer = activity.performers[0];
  const startDate = dayjs(activity.startAt);
  const endDate = dayjs(activity.endAt);

  // Compare current date vs start date in minutes
  const x =
    toPixel(startDate.diff(timetableStartAt, 'minute')) + MARKER_MARGIN / 2;
  // Avatar height + padding
  const y = (MARKER_MARGIN + 50) * row;

  const width = toPixel(endDate.diff(startDate, 'minute')) - MARKER_MARGIN;

  const isLight = useMemo(() => {
    // Calc color brightness difference
    const { red, green, blue } = parseToRgb(firstStreamer.color);

    return red * 0.299 + green * 0.587 + blue * 0.114 > 186;
  }, [firstStreamer.color]);

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
        boxShadow: `0 2px 6px ${rgba(firstStreamer.color, 0.48)}`,
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
