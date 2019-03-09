import React from 'react';
import { styled } from 'client/ui/styles';
import { Dayjs } from 'dayjs';

export interface GridsProps {
  dates: Dayjs[];
  gridWidth: number;
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Grid = styled.div`
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

export const Grids = (props: GridsProps) => {
  const { dates, gridWidth } = props;

  return (
    <Wrapper style={{ marginLeft: `${(gridWidth / 2) * -1}px` }}>
      {dates.map((roundedDate, i) => (
        <Grid key={`${roundedDate}-${i}`} style={{ width: gridWidth }} />
      ))}
    </Wrapper>
  );
};
