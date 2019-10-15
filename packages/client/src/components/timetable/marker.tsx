import dayjs from 'dayjs';
import { parseToRgb, rgba } from 'polished';
import React, { useMemo } from 'react';
import { ActivityFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { Avatar } from 'src/components/avatar';
import { AvatarGroup } from 'src/components/avatar-group';
import { SPELL_WIDTH, MARKER_MARGIN } from './layout';

const toPixel = (minute: number) => {
  const pixelPerMinute = SPELL_WIDTH / 30;

  return minute * pixelPerMinute;
};

interface WrapperProps {
  isLight: boolean;
}

const Wrapper = styled.a<WrapperProps>`
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

const AvatarContainer = styled.div`
  flex-shrink: 0;
  margin-right: 4px;
`;

const Meta = styled.div`
  min-width: 0;
`;

const Title = styled.h4`
  display: block;
  margin: 0;
  overflow: hidden;
  font-size: 14px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Name = styled.span`
  display: block;
  overflow: hidden;
  opacity: 0.8;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface MarkerProps {
  activity: ActivityFragment;
  row: number;
  timetableStartAt: dayjs.Dayjs;
}

export const Marker = (props: MarkerProps) => {
  const { activity, timetableStartAt, row } = props;
  const { performers, team } = activity;

  const performer = performers[0];
  const startAt = dayjs(activity.startAt);
  const endAt = dayjs(activity.endAt);

  // Compare current date vs start date in minutes
  const x =
    toPixel(startAt.diff(timetableStartAt, 'minute')) +
    MARKER_MARGIN / 2 +
    51.03 / 2;
  // Avatar height + padding
  const y = (50 + MARKER_MARGIN) * row;

  const width = toPixel(endAt.diff(startAt, 'minute')) - MARKER_MARGIN;

  const isLight = useMemo(() => {
    // Calc color brightness difference
    const { red, green, blue } = parseToRgb(performer.color);

    return red * 0.299 + green * 0.587 + blue * 0.114 > 186;
  }, [performer.color]);

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
        backgroundColor: performer.color,
        boxShadow: `0 2px 6px ${rgba(performer.color, 0.48)}`,
      }}
    >
      <AvatarContainer>
        {team ? (
          <AvatarGroup
            performers={performers}
            size={40}
            gap={-28}
            align="left"
          />
        ) : (
          <Avatar performer={performer} size={40} />
        )}
      </AvatarContainer>

      <Meta>
        <Title>{activity.name}</Title>
        <Name>{team ? team.name : performer.name}</Name>
      </Meta>
    </Wrapper>
  );
};
