import React from 'react';
import { styled } from 'src/styles';
import { TeamProps } from '.';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Meta = styled.div`
  flex: 1 1 auto;
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

export const Placeholder = (props: TeamProps) => (
  <Wrapper>
    <Meta>
      <Name />
      {props.withPerformerNames && <Description />}
    </Meta>
  </Wrapper>
);
