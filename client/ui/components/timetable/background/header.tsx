import React from 'react';
import { styled } from 'client/ui/styles';
import { markerWidth } from 'client/ui/styles/constants';
import { Dayjs } from 'dayjs';

export interface HeaderProps {
  dates: Dayjs[];
}

const Wrapper = styled.header`
  display: flex;
  position: relative;
`;

const Date = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 18px;
  color: ${({ theme }) => theme.foregroundLight};
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

export const Header = (props: HeaderProps) => {
  const { dates } = props;

  return (
    <Wrapper style={{ marginLeft: `${(markerWidth / 2) * -1}px` }}>
      {dates.map((date, i) => (
        <Date key={`${i}-${date.toString()}`} style={{ width: markerWidth }}>
          <time dateTime={date.toString()}>{date.format('HH:mm')}</time>
        </Date>
      ))}
    </Wrapper>
  );
};
