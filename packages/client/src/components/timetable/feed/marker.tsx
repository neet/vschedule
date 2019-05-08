import dayjs from 'dayjs';
import { opacify, parseToRgb } from 'polished';
import React, { useCallback, useMemo } from 'react';
import { Content } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { borderGap, markerGap } from 'src/styles/constants';

export interface MarkerProps {
  content: Content;
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
  const { content, startDate: basisDate, row } = props;
  const startDate = dayjs(content.startDate);
  const endDate = dayjs(content.endDate);

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
    const { red, green, blue } = parseToRgb(content.source.color);

    return red * 0.299 + green * 0.587 + blue * 0.114 > 186;
  }, [content]);

  return (
    <Wrapper
      tabIndex={0}
      href={content.url}
      title={content.name}
      target="__blank"
      rel="noreferrer"
      isLight={isLight}
      style={{
        width: `${width}px`,
        transform: `translate(${x}px, ${y}px)`,
        backgroundColor: content.source.color,
        boxShadow: `0 2px 6px ${opacify(0.48, content.source.color)}`,
      }}
    >
      <Avatar src={content.source.avatar} />

      <Meta>
        <Title>{content.name}</Title>
        <LiverName>{content.source.name}</LiverName>
      </Meta>
    </Wrapper>
  );
};
