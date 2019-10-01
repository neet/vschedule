import dayjs from 'dayjs';
import isMobile from 'ismobilejs';
import React, { useCallback, useEffect, useRef } from 'react';
import { useQueryParam, StringParam } from 'use-query-params';
import { ActivityFragment } from 'src/generated/graphql';
import { useNow } from 'src/hooks/use-now';
import { styled } from 'src/styles';
import { isStreamingNow } from 'src/utils/is-streaming-now';
import { Background } from './background';
import { FeedList } from './feed-list';
import { Placeholder } from './placeholder';

export interface TimetableProps {
  activities?: ActivityFragment[];
  loading: boolean;
}

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

export const Timetable = (props: TimetableProps) => {
  const { activities = [], loading } = props;
  const { now } = useNow(1000 * 60);
  const ref = useRef<HTMLDivElement>(null);
  const [startSince] = useQueryParam('start_since', StringParam);

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

  const startAt = startSince
    ? dayjs(startSince)
    : activities.reduce<dayjs.Dayjs | undefined>((result, activity) => {
        const date = dayjs(activity.startAt);
        if (!result || date.isBefore(result)) return date;

        return result;
      }, undefined);

  const endAt = activities.reduce<dayjs.Dayjs | undefined>(
    (result, activity) => {
      const date = dayjs(activity.endAt);
      if (!result || date.isAfter(result)) return date;

      return result;
    },
    undefined,
  );

  // useEffect(() => {
  //   if (!ref.current || !startAt) return;

  //   const fromStartToNow = dayjs().diff(startAt, 'minute');
  //   const screenWidth = window.innerWidth;
  //   const x = (borderGap / 30) * fromStartToNow - screenWidth / 2;

  //   ref.current.scrollTo(x, 0);
  // }, [startAt, ref]);

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

  // useEffect(() => {
  //   if (!startSince) return;

  //   const date = new Date(startSince).toISOString();
  //   const node = document.querySelector(`time[dateTime="${date}"]`);

  //   if (!node || !(node instanceof Element)) return;

  //   ref.current.scrollBy(Math.abs(node.getClientRects()[0].x));
  // }, [startSince]);

  if (loading) {
    return (
      <Wrapper>
        <Placeholder />
      </Wrapper>
    );
  }

  if (!startAt || !endAt) {
    return null;
  }

  return (
    <Wrapper ref={ref}>
      <Background
        now={now}
        startAt={startAt}
        endAt={endAt}
        count={streamingActivityCount}
      />
      <FeedList activities={activities} startAt={startAt} />
    </Wrapper>
  );
};
