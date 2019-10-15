import dayjs from 'dayjs';
import React from 'react';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { isStreamingNow } from 'src/utils/is-streaming-now';
import { Avatar } from './avatar';

interface Wrapper {
  isStreaming?: boolean;
}

export const Wrapper = styled.a<Wrapper>`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  transition: ease-out 0.15s;
  color: ${({ theme }) => theme.foregroundNormal};

  &:hover {
    text-decoration: none;
  }

  & > a {
    flex-shrink: 0;
    margin-right: 4px;
  }
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

const Meta = styled.div`
  flex-grow: 1;
  min-width: 0;
  margin-right: 8px;
`;

const Title = styled.span`
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
  color: ${({ theme }) => theme.foregroundLight};
`;

export const Name = styled.span`
  display: block;
  overflow: hidden;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Description = styled.p`
  display: block;
  margin-bottom: 4px;
  overflow: hidden;
  color: ${({ theme }) => theme.foregroundLight};
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export interface ActivityProps {
  activity: ActivityFragment;
  withDescription?: boolean;
  withPerforemer?: boolean;
}

export const Activity = (props: ActivityProps) => {
  const { activity, withDescription, withPerforemer } = props;
  const { team, performers } = activity;

  const performer = performers[0];
  const startAt = dayjs(activity.startAt);
  const isStreaming = isStreamingNow(activity.startAt, activity.endAt);

  if (!activity.performers.length) {
    return null;
  }

  return (
    <Wrapper
      tabIndex={0}
      href={activity.url}
      title={activity.name}
      target="_blank"
      rel="noreferrer"
      isStreaming={isStreaming}
    >
      <Meta>
        <Title>{activity.name}</Title>

        {withDescription && <Description>{activity.description}</Description>}

        {withPerforemer && (
          <PerformerWrapper>
            <Avatar
              size={18}
              performer={performer}
              background="performerColor"
            />

            <Name>
              {team ? team.name : performer.name}・{startAt.fromNow()}
            </Name>
          </PerformerWrapper>
        )}
      </Meta>

      <Thumbnail style={{ backgroundImage: `url(${activity.thumbnail})` }}>
        {isStreaming && <Badge />}
      </Thumbnail>
    </Wrapper>
  );
};
