import React, { useMemo } from 'react';
import { styled } from 'client/ui/styles';
import transparentToWhiteGradient from 'client/assets/transparent-to-white-gradient.png';
import { Borders } from './borders';
import { Header } from './header';
import { MinuteHand } from './minute-hand';
import dayjs, { Dayjs } from 'dayjs';

export interface BackgroundProps {
  startDate: Dayjs;
  endDate: Dayjs;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Fade = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  background-image: url(${transparentToWhiteGradient});
  background-repeat: repeat-y;
  background-size: contain;
`;

export const Background = (props: BackgroundProps) => {
  const { startDate, endDate } = props;

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
      <Borders dates={dates} />
      <MinuteHand startDate={startDate} />
      <Fade />
    </Wrapper>
  );
};
