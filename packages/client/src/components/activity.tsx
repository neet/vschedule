import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { borderGap, markerGap } from 'src/styles/constants';
import { isStreamingNow } from 'src/utils/is-streaming-now';
import { rgba } from 'polished';

interface Wrapper {
  isStreaming?: boolean;
}

export const Wrapper = styled.a<Wrapper>`
  display: flex;
  position: absolute;
  top: 70px;
  left: 0;
  box-sizing: border-box;
  align-items: center;
  padding: 6px;
  padding-left: 9px;
  overflow: hidden;
  transition: ease-out 0.15s;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.foregroundNormal};

  &:hover {
    transition: ease-in 0.15s;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
    text-decoration: none;
  }

  & > * {
    opacity: ${({ isStreaming }) => (isStreaming ? '1' : '0.5')};
  }
`;

const Avatar = styled.img`
  flex-shrink: 0;
  width: auto;
  height: 18px;
  margin-right: 4px;
  border-radius: 50%;
`;

export const Thumbnail = styled.div`
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 88px;
  height: 50px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  background-position: center;
  background-size: cover;
`;

const Badge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 12px;
  height: 12px;
  border: 3px solid ${({ theme }) => theme.backgroundNormal};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.highlightNormal};
`;

export const Meta = styled.div`
  flex-grow: 1;
  min-width: 0;
  margin-right: 8px;
`;

export const Title = styled.h4`
  display: block;
  margin-bottom: 4px;
  overflow: hidden;
  font-size: 14px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PerformerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const PerformerName = styled.span`
  display: block;
  overflow: hidden;
  opacity: 0.8;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export interface ActivityProps {
  activity: ActivityFragment;
  row: number;
  startAt: dayjs.Dayjs;
}

export const Activity = (props: ActivityProps) => {
  const { activity, startAt: basisDate, row } = props;

  if (!activity.performers.length) {
    return null;
  }

  const firstPerformer = activity.performers[0];
  const startAt = dayjs(activity.startAt);
  const endAt = dayjs(activity.endAt);

  const isStreaming = isStreamingNow(activity.startAt, activity.endAt);

  const convertMinuteToPixel = useCallback((minute: number) => {
    const pixelPerMinute = borderGap / 30;

    return minute * pixelPerMinute;
  }, []);

  // Compare current date vs start date in minutes
  const x =
    convertMinuteToPixel(startAt.diff(basisDate, 'minute')) + markerGap / 2;
  // Avatar height + border + padding
  const y = (markerGap + 50 + 3 + 6 * 2) * row;

  const width = convertMinuteToPixel(endAt.diff(startAt, 'minute')) - markerGap;

  return (
    <Wrapper
      tabIndex={0}
      href={activity.url}
      title={activity.name}
      target="_blank"
      rel="noreferrer"
      isStreaming={isStreaming}
      style={{
        width: `${width}px`,
        transform: `translate(${x}px, ${y}px)`,
        borderLeft: `3px solid ${
          isStreaming ? firstPerformer.color : rgba(firstPerformer.color, 0.5)
        }`,
      }}
    >
      <Meta>
        <Title>{activity.name}</Title>

        <PerformerWrapper>
          <Avatar
            src={firstPerformer.avatar}
            style={{ backgroundColor: firstPerformer.color }}
          />
          <PerformerName>
            {firstPerformer.name}・{dayjs(startAt).fromNow()}
          </PerformerName>
        </PerformerWrapper>
      </Meta>

      <Thumbnail style={{ backgroundImage: `url(${activity.thumbnail})` }}>
        {isStreaming && <Badge />}
      </Thumbnail>
    </Wrapper>
  );
};
