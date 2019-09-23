import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { borderGap, markerGap } from 'src/styles/constants';

export interface MarkerProps {
  activity: ActivityFragment;
  row: number;
  startDate: dayjs.Dayjs;
}

export const Wrapper = styled.a`
  display: flex;
  position: absolute;
  top: 115px;
  left: 0;
  box-sizing: border-box;
  align-items: center;
  padding: 6px;
  /* padding-right: 0px; */
  /* border: 1px solid ${({ theme }) => theme.borderNormal}; */
  /* border-radius: 6px; */
  background-color: ${({ theme }) => theme.backgroundNormal};
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.foregroundNormal};

  &:hover {
    text-decoration: none;
  }
`;

const Avatar = styled.img`
  width: 21px;
  height: 21px;
  margin-right: 4px;
  /* border: 1px solid ${({ theme }) => theme.borderNormal}; */
  border-radius: 50%;
  /* background-color: ${({ theme }) => theme.backgroundNormal}; */
`;

export const Thumbnail = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 88px;
  height: 50px;
  margin-right: 6px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  background-position: center;
  background-size: cover;
`;

export const Meta = styled.div`
  min-width: 0;
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

export const Marker = (props: MarkerProps) => {
  const { activity, startDate: basisDate, row } = props;

  if (!activity.performers.length) {
    return null;
  }

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
  const y = (markerGap + 50 + 3 + 1 + 4 * 2) * row;

  const width =
    convertMinuteToPixel(endDate.diff(startDate, 'minute')) - markerGap;

  return (
    <Wrapper
      tabIndex={0}
      href={activity.url}
      title={activity.name}
      target="_blank"
      rel="noreferrer"
      style={{
        width: `${width}px`,
        transform: `translate(${x}px, ${y}px)`,
        borderRight: `5px solid ${firstStreamer.color}`,
      }}
    >
      <Thumbnail style={{ backgroundImage: `url(${activity.thumbnail})` }} />

      <Meta>
        <Title>{activity.name}</Title>

        <PerformerWrapper>
          <Avatar
            src={firstStreamer.avatar}
            style={{ backgroundColor: firstStreamer.color }}
          />
          <PerformerName>
            {firstStreamer.name}・{dayjs(startDate).fromNow()}
          </PerformerName>
        </PerformerWrapper>
      </Meta>
    </Wrapper>
  );
};
