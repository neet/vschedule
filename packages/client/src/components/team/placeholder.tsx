import React from 'react';
import { styled } from 'src/styles';
import { pulse } from 'src/styles/keyframes';
import { TeamProps } from '.';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-height: 43px;
  animation: ${pulse} 2s ease-out infinite;
`;

const Meta = styled.div`
  flex: 1 1 auto;
`;

const Name = styled.div`
  width: 50%;
  height: 1.215em;
  margin-top: calc(1em * 0.5 / 2);
  margin-bottom: calc(1em * 0.5);
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundDark};
`;

const Description = styled.div`
  width: 80%;
  height: 1em;
  margin: calc(1em * 0.5 / 2) 0;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundDark};
`;

export const Placeholder = (props: TeamProps) => (
  <Wrapper>
    <Meta>
      <Name />
      {props.withPerformerNames && <Description />}
    </Meta>
  </Wrapper>
);
