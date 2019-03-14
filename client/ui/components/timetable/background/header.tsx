import React from 'react';
import { styled } from 'client/ui/styles';
import { markerWidth } from 'client/ui/styles/constants';
import dayjs, { Dayjs } from 'dayjs';

export interface HeaderProps {
  dates: Dayjs[];
}

const Wrapper = styled.header`
  position: relative;
  flex: 1 1 auto;
`;

const Horizontal = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const Date = styled.div`
  position: sticky;
  top: 1px;
  left: 2px;
  flex: 0 0 auto;
  width: 200px;
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

const Time = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 18px;
  color: ${({ theme }) => theme.foregroundLight};
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

export const Header = (props: HeaderProps) => {
  const { dates: dateTimes } = props;

  const dates = dateTimes
    .reduce(
      (result, date) => {
        const roundedDate = date
          .minute(0)
          .hour(0)
          .valueOf();

        if (!result.includes(roundedDate)) {
          result.push(roundedDate);
        }

        return result;
      },
      [] as number[],
    )
    .map(date => dayjs(date));

  return (
    <Wrapper style={{ marginLeft: `${(markerWidth / 2) * -1}px` }}>
      <Horizontal>
        {dates.map((date, i) => (
          <Date key={`${i}-${date.toString()}`}>{date.format('LL')}</Date>
        ))}
      </Horizontal>

      <Horizontal>
        {dateTimes.map((date, i) => (
          <Time key={`${i}-${date.toString()}`} style={{ width: markerWidth }}>
            <time dateTime={date.toString()}>{date.format('HH:mm')}</time>
          </Time>
        ))}
      </Horizontal>
    </Wrapper>
  );
};
