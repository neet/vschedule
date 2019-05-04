import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Content } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { Background } from './background';
import { borderGap, sidebarWidth } from 'src/styles/constants';
import { Feed } from './feed';
import { Placeholder } from './placeholder';
import isMobile from 'ismobilejs';
import { useNow } from 'src/hooks/use-now';

export interface TimetableProps {
  contents: Content[];
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-left: 0;
  overflow-x: scroll;
  overflow-y: hidden; /* fixme */
  -webkit-overflow-scrolling: touch;

  @media screen and (min-width: 700px) {
    width: calc(100% - ${sidebarWidth}px);
    margin-left: ${sidebarWidth}px;
  }
`;

export const Timetable = (props: TimetableProps) => {
  const { contents } = props;
  const { now } = useNow(1000 * 60);
  const ref = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!ref.current || !e.deltaY) return;
    ref.current.scrollBy({ left: e.deltaY });
  }, []);

  const startDate = useMemo(
    () =>
      contents.reduce<Dayjs | undefined>((result, content) => {
        const date = dayjs(content.startDate);
        if (!result || date.isBefore(result)) return date;
        return result;
      }, undefined),
    [contents],
  );

  const endDate = useMemo(
    () =>
      contents.reduce<Dayjs | undefined>((result, content) => {
        const date = dayjs(content.endDate);
        if (!result || date.isAfter(result)) return date;
        return result;
      }, undefined),
    [contents],
  );

  useEffect(() => {
    if (!ref.current || !startDate) return;

    const fromNowToStart = now.diff(startDate, 'minute');
    const screenWidth = window.innerWidth;
    let x = (borderGap / 30) * fromNowToStart - screenWidth / 2;

    if (screenWidth < 700) {
      x - sidebarWidth;
    }

    ref.current.scrollTo(x, 0);
  }, [startDate, endDate, now]);

  useEffect(() => {
    if (isMobile.any || !ref.current) return;
    ref.current.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      if (isMobile.any || !ref.current) return;
      ref.current.removeEventListener('wheel', handleWheel);
    };
  });

  if (!contents.length || !startDate || !endDate) {
    return (
      <Wrapper>
        <Placeholder />
      </Wrapper>
    );
  }

  return (
    <Wrapper ref={ref}>
      <Background now={now} startDate={startDate} endDate={endDate} />
      <Feed contents={contents} startDate={startDate} />
    </Wrapper>
  );
};
