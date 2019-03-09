import React from 'react';
import { styled } from 'client/ui/styles';
import { Dayjs } from 'dayjs';

export interface TimelineGridsProps {
  dates: Dayjs[];
  gridWidth: number;
}

export interface VerticalBarProps {
  width: string;
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

export const TimelineGrids = (props: TimelineGridsProps) => {
  const { dates, gridWidth } = props;

  return (
    <Wrapper style={{ marginLeft: `${(gridWidth / 2) * -1}px` }}>
      {dates.map((roundedDate, i) => (
        <Border key={`${roundedDate}-${i}`} style={{ width: gridWidth }} />
      ))}
    </Wrapper>
  );
};
