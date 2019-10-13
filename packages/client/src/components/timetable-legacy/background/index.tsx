import dayjs from 'dayjs';
import { parseToRgb } from 'polished';
import React, { useMemo } from 'react';
import { styled } from 'src/styles';
import { Borders } from './borders';
import { Header } from './header';
import { MinuteHand } from './minute-hand';

export interface BackgroundProps {
  now: dayjs.Dayjs;
  count: number;
  startAt: dayjs.Dayjs;
  endAt: dayjs.Dayjs;
}

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
`;

const Fade = styled.div`
  display: none;
  position: fixed;
  z-index: 99;
  top: 0;
  right: 0;
  width: 8%;
  height: 100%;
  background-image: ${({ theme }) => {
    const { red, blue, green } = parseToRgb(theme.backgroundNormal);

    return `linear-gradient(90deg, rgba(${red}, ${blue}, ${green}, 0%) 0%, rgba(${red}, ${blue}, ${green}, 100%) 100%)`;
  }};

  @media screen and (min-width: 700px) {
    display: block;
  }
`;

export const Background = (props: BackgroundProps) => {
  const { now, count, startAt, endAt } = props;

  const dates = useMemo(() => {
    // Rond down the minutes which less than 30 mintues
    const basisDate = startAt.set('minute', startAt.minute() >= 30 ? 30 : 0);

    const gridCount = dayjs(endAt).diff(startAt, 'minute') / 30;

    // Make array of dates, every 30 minutes
    return Array.from({ length: gridCount }, (_, i) => {
      let childDate = basisDate.add(i / 2, 'hour');

      if (
        // Starts from 0
        (basisDate.minute() === 0 && (i + 1) % 2 === 0) ||
        // Starts from 30
        (basisDate.minute() === 30 && (i + 1) % 2 === 1)
      ) {
        childDate = childDate.set('minute', 30);
      }

      return childDate;
    });
  }, [startAt, endAt]);

  return (
    <Wrapper>
      <Header dates={dates} />
      <MinuteHand now={now} startAt={startAt} count={count} />
      <Borders dates={dates} aria-hidden />
      <Fade aria-hidden />
    </Wrapper>
  );
};