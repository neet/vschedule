import React from 'react';
import { Dayjs } from 'dayjs';
import { Activity } from 'src/components/activity';
import { animated, useTransition } from 'react-spring';
import { ActivityFragment } from 'src/generated/graphql';
import { isStreamingNow } from 'src/utils/is-streaming-now';
import { styled } from 'src/styles';

const ActivityContainer = styled(animated.li)`
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.borderNormal};
`;

interface ActivityListProps {
  activities: ActivityFragment[];
  focusedDate: Dayjs;
}

export const ActivityList = (props: ActivityListProps) => {
  const { activities, focusedDate } = props;

  const transition = useTransition(activities, activity => activity.id, {
    from: {
      opacity: 0,
      transform: `translateX(50px)`,
    },
    enter: {
      opacity: 1,
      transform: `translateX(0px)`,
    },
    leave: {
      opacity: 0,
      transform: `translateX(-50px)`,
    },
    config: {
      duration: 250,
    },
  });

  return (
    <ul>
      {transition.map(({ item: activity, key, props }) => {
        const isStreaming = isStreamingNow(
          activity.startAt,
          activity.endAt,
          focusedDate,
        );

        return (
          <ActivityContainer key={key} style={props}>
            <div style={{ opacity: isStreaming ? 1 : 0.5 }}>
              <Activity activity={activity} withPerforemer />
            </div>
          </ActivityContainer>
        );
      })}
    </ul>
  );
};
