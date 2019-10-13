import React from 'react';
import { styled } from 'src/styles';
import { PerformerFragment } from 'src/generated/graphql';
import { Avatar } from './avatar';

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  & > img {
    flex-shrink: 0;
    margin-right: 8px;
  }
`;

const Meta = styled.div`
  flex: 1 0 auto;
`;

const Name = styled.span`
  font-weight: bold;
`;

interface PerformerCompactProps {
  performer: PerformerFragment;
}

export const PerformerCompact = (props: PerformerCompactProps) => {
  const { performer } = props;

  return (
    <Wrapper>
      <Avatar size={36} performer={performer} background="performerColor" />

      <Meta>
        <Name>{performer.name}</Name>
      </Meta>
    </Wrapper>
  );
};
