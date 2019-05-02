import React, { useMemo } from 'react';
import { styled } from 'client/ui/styles';
import { Borders } from './borders';
import { Header } from './header';
import { MinuteHand } from './minute-hand';
import dayjs, { Dayjs } from 'dayjs';
import { parseToRgb } from 'polished';

export interface BackgroundProps {
  now: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
}

const Wrapper = styled.div`
  display: flex;
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
  const { now, startDate, endDate } = props;

  const dates = useMemo(() => {
    // Rond down the minutes which less than 30 mintues
    const basisDate = startDate.set(
      'minute',
      startDate.minute() >= 30 ? 30 : 0,
    );

    const gridCount = dayjs(endDate).diff(startDate, 'minute') / 30;

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
  }, [startDate, endDate]);

  return (
    <Wrapper>
      <Header dates={dates} />
      <MinuteHand now={now} startDate={startDate} />
      <Borders dates={dates} aria-hidden />
      <Fade aria-hidden />
    </Wrapper>
  );
};
