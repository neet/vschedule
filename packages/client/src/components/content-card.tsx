import dayjs from 'dayjs';
import React from 'react';
import { ActivityFragment } from 'src/generated/graphql';
import { useNow } from 'src/hooks/use-now';
import { css, styled } from 'src/styles';

export interface ContentCardProps {
  activity: ActivityFragment;
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

export const ContentCard = (props: ContentCardProps) => {
  const { activity } = props;
  const { now } = useNow();

  const startDate = dayjs(activity.startAt);
  const endDate = dayjs(activity.endAt);
  const fromNow = startDate.from(now);

  const isStreaming =
    (startDate.isBefore(now) || startDate.isSame(now)) && endDate.isAfter(now);
  const textualContent = activity.name;

  return (
    <Wrapper
      href={activity.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={0}
      title={textualContent}
      aria-label={textualContent}
      isStreaming={isStreaming}
    >
      <Thumbnail style={{ backgroundImage: `url(${activity.thumbnail})` }} />

      <Meta>
        <Title>{activity.name}</Title>
        <Time dateTime={activity.startAt}>{fromNow}</Time>
      </Meta>
    </Wrapper>
  );
};
