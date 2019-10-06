import dayjs from 'dayjs';
import React from 'react';
import { styled } from 'src/styles';
import { borderGap } from 'src/styles/constants';

export interface HeaderProps {
  dates: dayjs.Dayjs[];
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

  return (
    <Wrapper style={{ marginLeft: `${(borderGap / 2) * -1}px` }}>
      <Horizontal>
        {dateTimes.map((date, i) => (
          <Time key={`${i}-${date.toString()}`} style={{ width: borderGap }}>
            <time dateTime={date.toISOString()}>{date.format('HH:mm')}</time>
          </Time>
        ))}
      </Horizontal>
    </Wrapper>
  );
};
