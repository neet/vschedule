import dayjs from 'dayjs';
import React from 'react';
import { borderGap, markerGap } from 'src/styles/constants';
import { styled } from 'src/styles';
import { ActivityFragment } from 'src/generated/graphql';
import { Activity } from 'src/components/activity';
import { isStreamingNow } from 'src/utils/is-streaming-now';
import { rgba } from 'polished';

interface WrapperProps {
  isStreaming: boolean;
}

const Wrapper = styled.li<WrapperProps>`
  position: absolute;
  top: 70px;
  left: 0;
  box-sizing: border-box;
  padding: 6px;
  padding-left: 9px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    transition: ease-in 0.15s;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  }

  & > * {
    opacity: ${({ isStreaming }) => (isStreaming ? '1' : '0.5')};
  }
`;

interface FeedProps {
  activity: ActivityFragment;
  row: number;
  startAt: dayjs.Dayjs;
}

export const Feed = (props: FeedProps) => {
  const { activity, startAt: basisDate, row } = props;
  const startAt = dayjs(activity.startAt);
  const endAt = dayjs(activity.endAt);
  const isStreaming = isStreamingNow(activity.startAt, activity.endAt);

  const color = activity.performers[0].color;

  const convertMinuteToPixel = (minute: number) => {
    const pixelPerMinute = borderGap / 30;
    return minute * pixelPerMinute;
  };

  // Compare current date vs start date in minutes
  const x =
    convertMinuteToPixel(startAt.diff(basisDate, 'minute')) + markerGap / 2;

  // Avatar height + border + padding
  const y = (markerGap + 50 + 3 + 6 * 2) * row;

  // from start to end, minus gap
  const width = convertMinuteToPixel(endAt.diff(startAt, 'minute')) - markerGap;

  return (
    <Wrapper
      isStreaming={isStreaming}
      style={{
        width: `${width}px`,
        transform: `translate(${x}px, ${y}px)`,
        borderLeft: `3px solid ${isStreaming ? color : rgba(color, 0.5)}`,
      }}
    >
      <Activity activity={activity} />
    </Wrapper>
  );
};
