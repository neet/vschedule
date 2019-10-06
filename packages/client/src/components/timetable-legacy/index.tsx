import dayjs, { Dayjs } from 'dayjs';
import isMobile from 'ismobilejs';
import React, { useCallback, useEffect, useRef } from 'react';
import { useQueryParam, StringParam } from 'use-query-params';
import { useTranslation } from 'react-i18next';
import {
  ActivityFragment,
  // useFetchActivitiesQuery,
} from 'src/generated/graphql';
import { useNow } from 'src/hooks/use-now';
import { styled } from 'src/styles';
import { isStreamingNow } from 'src/utils/is-streaming-now';
import { Background } from './background';
import { FeedList } from './feed-list';
import { Placeholder } from './placeholder';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-left: 0;
  /* scroll-behavior: smooth; */
  overflow-x: scroll;
  overflow-y: hidden; /* fixme */
  background-color: ${({ theme }) => theme.backgroundWash};
  -webkit-overflow-scrolling: touch;
`;

export interface TimetableProps {
  activities?: ActivityFragment[];
  loading: boolean;
  onLoadNext?: () => void;
  onLoadPrevious?: () => void;
}

export const Timetable = (props: TimetableProps) => {
  const { activities = [], loading, onLoadNext, onLoadPrevious } = props;
  const { t } = useTranslation();
  const { now } = useNow(1000 * 60);
  const ref = useRef<HTMLDivElement>(null);
  const [afterDate] = useQueryParam('after_date', StringParam);
  const [beforeDate] = useQueryParam('before_date', StringParam);
  const initialTimetableStartAt = useRef<Dayjs>();

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!ref.current || !e.deltaY) return;
    ref.current.scrollBy({ left: e.deltaY });
  }, []);

  const streamingActivityCount = activities.reduce((result, activity) => {
    if (isStreamingNow(activity.startAt, activity.endAt, now)) {
      return result + 1;
    }

    return result;
  }, 0);

  const startAt = afterDate
    ? dayjs(afterDate)
    : activities.reduce<dayjs.Dayjs | undefined>((result, activity) => {
        const date = dayjs(activity.startAt);
        if (!result || date.isBefore(result)) return date;

        return result;
      }, undefined);

  const endAt = beforeDate
    ? dayjs(beforeDate)
    : activities.reduce<dayjs.Dayjs | undefined>((result, activity) => {
        const date = dayjs(activity.endAt);
        if (!result || date.isAfter(result)) return date;

        return result;
      }, undefined);

  useEffect(() => {
    // const node = document.getElementById('minute-hand');
    // if (!node || !(node instanceof Element)) return;
    // node.scrollIntoView({
    //   behavior: 'auto',
    //   inline: 'center',
    // });
  }, [startAt]);

  useEffect(() => {
    const isAnyMobile = isMobile(navigator.userAgent).any;
    const refCopy = ref.current;

    if (isAnyMobile || !ref.current) return;
    ref.current.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      if (isAnyMobile || !refCopy) return;
      refCopy.removeEventListener('wheel', handleWheel);
    };
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollLeft < 200) {
      onLoadPrevious && onLoadPrevious();
    } else if (e.currentTarget.scrollWidth - e.currentTarget.scrollLeft < 200) {
      onLoadNext && onLoadNext();
    }
  };

  if (!initialTimetableStartAt.current) {
    initialTimetableStartAt.current = startAt;
  }

  if (loading) {
    return (
      <Wrapper>
        <Placeholder />
      </Wrapper>
    );
  }

  if (
    !activities.length ||
    !startAt ||
    !endAt ||
    !initialTimetableStartAt.current
  ) {
    return (
      <Wrapper>
        {t('timetable.not_found', { defaultValue: 'No activities found' })}
      </Wrapper>
    );
  }

  return (
    <Wrapper ref={ref} onScroll={handleScroll}>
      <Background
        now={now}
        startAt={initialTimetableStartAt.current}
        endAt={endAt}
        count={streamingActivityCount}
      />
      <FeedList
        activities={activities}
        startAt={initialTimetableStartAt.current}
      />
    </Wrapper>
  );
};
