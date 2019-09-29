import dayjs from 'dayjs';
import isMobile from 'ismobilejs';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { ActivityFragment } from 'src/generated/graphql';
import { useNow } from 'src/hooks/use-now';
import { styled } from 'src/styles';
import { borderGap, bannerHeight } from 'src/styles/constants';
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
  height: calc(100vh - ${bannerHeight}px);
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

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!ref.current || !e.deltaY) return;
    ref.current.scrollBy({ left: e.deltaY });
  }, []);

  const streamingActivityCount = useMemo(
    () =>
      activities.reduce((result, activity) => {
        if (isStreamingNow(activity.startAt, activity.endAt)) {
          return result + 1;
        }

        return result;
      }, 0),
    [activities],
  );

  const startAt = useMemo(
    () =>
      activities.reduce<dayjs.Dayjs | undefined>((result, content) => {
        const date = dayjs(content.startAt);
        if (!result || date.isBefore(result)) return date;

        return result;
      }, undefined),
    [activities],
  );

  const endAt = useMemo(
    () =>
      activities.reduce<dayjs.Dayjs | undefined>((result, content) => {
        const date = dayjs(content.endAt);
        if (!result || date.isAfter(result)) return date;

        return result;
      }, undefined),
    [activities],
  );

  useEffect(() => {
    if (!ref.current || !startAt) return;

    const fromStartToNow = now.diff(startAt, 'minute');
    const screenWidth = window.innerWidth;
    const x = (borderGap / 30) * fromStartToNow - screenWidth / 2;

    ref.current.scrollTo(x, 0);
  }, [startAt, ref, now]);

  useEffect(() => {
    if (!ref.current || !startAt) return;

    // const fromNowToStart = now.diff(startAt, 'minute');
    // const screenWidth = window.innerWidth;
    // const x = (borderGap / 30) * fromNowToStart - screenWidth / 2;

    // if (screenWidth >= 700) {
    //   x += sidebarWidth;
    // }

    // ref.current.scrollTo(x, 0);
  }, [startAt, endAt, now]);

  useEffect(() => {
    const isAnyMobile = isMobile(navigator.userAgent).any;

    if (isAnyMobile || !ref.current) return;
    ref.current.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      if (isAnyMobile || !ref.current) return;
      ref.current.removeEventListener('wheel', handleWheel);
    };
  });

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
