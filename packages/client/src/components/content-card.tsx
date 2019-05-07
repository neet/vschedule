import dayjs from 'dayjs';
import querystring from 'querystring';
import React from 'react';
import { Content } from 'src/generated/graphql';
import { getThumbnailImageUrl } from 'src/helpers/get-thumbnail-image-url';
import { useNow } from 'src/hooks/use-now';
import { css, styled } from 'src/styles';

export interface ContentCardProps {
  content: Content;
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
  const { content } = props;
  const { now } = useNow();

  const startDate = dayjs(content.startDate);
  const endDate = dayjs(content.endDate);
  const fromNow = startDate.from(now);

  const isStreaming =
    (startDate.isBefore(now) || startDate.isSame(now)) && endDate.isAfter(now);

  const videoId = querystring.parse(content.url.split('?')[1]).v as string;
  const thumbnailImageUrl = getThumbnailImageUrl(videoId);
  const textForScreenReader = `${content.name} ${content.source.name} ${
    content.description
  }`;

  return (
    <Wrapper
      href={content.url}
      target="__blank"
      rel="norefferer"
      title={content.name}
      tabIndex={0}
      aria-label={textForScreenReader}
      isStreaming={isStreaming}
    >
      <Thumbnail style={{ backgroundImage: `url(${thumbnailImageUrl})` }} />

      <Meta>
        <Title>{content.name}</Title>
        <Time dateTime={content.startDate}>{fromNow}</Time>
      </Meta>
    </Wrapper>
  );
};
