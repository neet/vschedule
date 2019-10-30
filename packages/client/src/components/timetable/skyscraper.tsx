import React from 'react';
import { ActivityFragment } from 'src/generated/graphql';
import dayjs, { Dayjs } from 'dayjs';
import { animated, useTransition } from 'react-spring';
import { Activity } from 'src/components/activity';
import { styled } from 'src/styles';
import { isStreamingNow } from 'src/utils/is-streaming-now';
import { Trans } from 'react-i18next';

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  width: 340px;
  height: calc(100% - 50px);
  /* margin: 24px; */
  /* margin-bottom: -24px; */
  padding: 8px 12px;
  overflow: scroll;
  /* border-radius: 6px; */
  background-color: ${({ theme }) => theme.backgroundNormal};
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
`;

const Title = styled.h2`
  font-size: 16px;

  strong {
    color: ${({ theme }) => theme.highlightNormal};
    font-size: 24px;
  }
`;

const ActivityContainer = styled(animated.div)`
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.borderNormal};
`;

interface SkyscraperProps {
  activities: ActivityFragment[];
  focusedDate: Dayjs;
}

export const Skyscraper = (props: SkyscraperProps) => {
  const { focusedDate } = props;

  const activities = props.activities.filter(activity =>
    dayjs(activity.endAt).isAfter(focusedDate),
  );

  const streamingActivities = activities.filter(activity =>
    isStreamingNow(activity.startAt, activity.endAt, focusedDate),
  );

  const transition = useTransition(activities, activity => activity.id, {
    from: {
      // height: '0px',
      opacity: 0,
      transform: `translateX(50px)`,
    },
    enter: {
      // height: '56.25px',
      opacity: 1,
      transform: `translateX(0px)`,
    },
    leave: {
      // height: '0px',
      opacity: 0,
      transform: `translateX(-50px)`,
    },
    config: {
      duration: 250,
    },
  });

  return (
    <Wrapper>
      <Title>
        <Trans
          i18nKey={'timetable.streaming_count'}
          count={streamingActivities.length}
        >
          <strong>{{ count: streamingActivities.length }}</strong> live stream
          is on air
        </Trans>
      </Title>

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
    </Wrapper>
  );
};
