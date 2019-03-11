import React from 'react';
import { styled } from 'client/ui/styles';
import { Dayjs } from 'dayjs';
import { markerWidth } from 'client/ui/styles/constants';

export interface BordersProps {
  dates: Dayjs[];
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Border = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.borderNormal};

  &::before {
    content: '';
    display: block;
    height: 100%;
    border-left: 1px solid ${({ theme }) => theme.borderNormal};
  }
`;

export const Borders = (props: BordersProps) => {
  const { dates } = props;

  return (
    <Wrapper style={{ marginLeft: `${(markerWidth / 2) * -1}px` }}>
      {dates.map((roundedDate, i) => (
        <Border key={`${roundedDate}-${i}`} style={{ width: markerWidth }} />
      ))}
    </Wrapper>
  );
};
