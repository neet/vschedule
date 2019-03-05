import React from 'react';
import { Dayjs } from 'dayjs';
import { styled } from '../styles';

export interface TimelineDatesProps {
  dates: Dayjs[];
  gridWidth: number;
}

const Wrapper = styled.div`
  display: flex;
`;

const Date = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 12px;
  color: ${({ theme }) => theme.foregroundLight};
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

export const TimelineDates = (props: TimelineDatesProps) => {
  const { gridWidth } = props;

  return (
    <Wrapper style={{ marginLeft: `${(gridWidth / 2) * -1}px` }}>
      {props.dates.map((date, i) => (
        <Date key={`${i}-${date.toString()}`} style={{ width: gridWidth }}>
          <span>{date.format('HH:mm')}</span>
        </Date>
      ))}
    </Wrapper>
  );
};
