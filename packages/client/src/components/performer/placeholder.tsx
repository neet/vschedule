import React from 'react';
import { styled } from 'src/styles';
import { Meta, PerformerProps } from '.';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div`
  flex: 0 0 auto;
  width: 36px;
  height: 36px;
  margin-right: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.backgroundDark};
`;

const Name = styled.div`
  width: 50%;
  height: 1.215em;
  margin-top: calc(1em * 0.5 / 2);
  margin-bottom: calc(1em * 0.5);
  background-color: ${({ theme }) => theme.backgroundDark};
`;

const Description = styled.div`
  width: 80%;
  height: 1em;
  margin: calc(1em * 0.5 / 2) 0;
  background-color: ${({ theme }) => theme.backgroundDark};
`;

export const Placeholder = (props: PerformerProps) => {
  return (
    <Wrapper>
      <Circle />

      <Meta>
        <Name />
        {props.withDescription && <Description />}
      </Meta>
    </Wrapper>
  );
};
