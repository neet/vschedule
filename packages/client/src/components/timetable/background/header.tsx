import React from 'react';
import { styled } from 'client/ui/styles';
import { borderGap } from 'client/ui/styles/constants';
import dayjs, { Dayjs } from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

export interface HeaderProps {
  dates: Dayjs[];
}

interface DatePosition {
  date: number;
  width: number;
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
  flex: 0 0 auto;
  width: 200px;
  padding: 18px 18px 8px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  color: ${({ theme }) => theme.foregroundNormal};
  font-size: 16px;
  font-weight: bold;

  time {
    position: sticky;
    top: 0px;
    left: 18px;
    flex: 0 0 auto;

    svg {
      margin-right: 0.5em;
    }
  }
`;

const Time = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 8px 18px 18px;
  color: ${({ theme }) => theme.foregroundLight};
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

export const Header = (props: HeaderProps) => {
  const { dates: dateTimes } = props;

  const dates = dateTimes.reduce<DatePosition[]>((result, date) => {
    const roundedDate = date
      .minute(0)
      .hour(0)
      .valueOf();

    const prev = result.findIndex(({ date }) => date === roundedDate);

    if (prev === -1) {
      result.push({
        width: borderGap,
        date: roundedDate,
      });
    } else {
      result[prev].width += borderGap;
    }

    return result;
  }, []);

  return (
    <Wrapper style={{ marginLeft: `${(borderGap / 2) * -1}px` }}>
      <Horizontal>
        {dates.map((date, i) => (
          <Date
            key={`${i}-${date.date.toString()}`}
            style={{ width: `${date.width}px` }}
          >
            <time dateTime={date.date.toString()}>
              <FontAwesomeIcon icon={faCalendar} />
              {dayjs(date.date).format('LL')}
            </time>
          </Date>
        ))}
      </Horizontal>

      <Horizontal>
        {dateTimes.map((date, i) => (
          <Time key={`${i}-${date.toString()}`} style={{ width: borderGap }}>
            <time dateTime={date.toString()}>{date.format('HH:mm')}</time>
          </Time>
        ))}
      </Horizontal>
    </Wrapper>
  );
};
