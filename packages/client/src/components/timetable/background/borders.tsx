import React from 'react';
import { styled } from 'client/ui/styles';
import { Dayjs } from 'dayjs';
import { borderGap } from 'client/ui/styles/constants';

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
  flex: 1 0 auto;
  justify-content: center;
  border-left: 1px solid ${({ theme }) => theme.borderNormal};

  &::before {
    content: '';
    display: block;
    box-sizing: border-box;
    height: 100%;
    border-left: 1px solid ${({ theme }) => theme.borderNormal};
  }
`;

export const Borders = (props: BordersProps) => {
  const { dates } = props;

  return (
    <Wrapper style={{ marginLeft: `${(borderGap / 2) * -1}px` }}>
      {dates.map((roundedDate, i) => (
        <Border key={`${roundedDate}-${i}`} style={{ width: borderGap }} />
      ))}
    </Wrapper>
  );
};
