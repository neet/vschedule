import React from 'react';
import { Dayjs } from 'dayjs';
import { styled } from 'src/styles';
import { SPELL_WIDTH } from './layout';

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Date = styled.time`
  padding: 8px;
  font-size: 14px;
  font-weight: bold;
`;

const Stripe = styled.div`
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.borderNormal};
`;

const toPixel = (minute: number) => {
  const pixelPerMinute = SPELL_WIDTH / 30;

  return minute * pixelPerMinute;
};

interface SpellProps {
  date: Dayjs;
  timetableStartAt: Dayjs;
}

export const Spell = (props: SpellProps) => {
  const { date, timetableStartAt } = props;
  const x = toPixel(date.diff(timetableStartAt, 'minute'));

  return (
    <Wrapper
      id={`spell-${date.toISOString()}`}
      style={{ transform: `translateX(${x}px)` }}
    >
      <Date dateTime={date.toISOString()}>{date.format('HH:mm')}</Date>
      <Stripe />
    </Wrapper>
  );
};
