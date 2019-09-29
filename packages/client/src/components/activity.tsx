import dayjs from 'dayjs';
import React from 'react';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { isStreamingNow } from 'src/utils/is-streaming-now';

interface Wrapper {
  isStreaming?: boolean;
}

export const Wrapper = styled.a<Wrapper>`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  transition: ease-out 0.15s;
  background-color: ${({ theme }) => theme.backgroundNormal};
  color: ${({ theme }) => theme.foregroundNormal};

  &:hover {
    text-decoration: none;
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
  /* font-weight: bold; */
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
}

export const Activity = (props: ActivityProps) => {
  const { activity } = props;

  const firstPerformer = activity.performers[0];
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
