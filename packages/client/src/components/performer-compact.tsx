import React from 'react';
import { styled } from 'src/styles';
import { PerformerFragment } from 'src/generated/graphql';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  flex-shrink: 0;
  width: 36px;
  height: auto;
  margin-right: 8px;
  border-radius: 50%;
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
      <Avatar
        src={performer.avatar}
        alt={performer.name}
        style={{ backgroundColor: performer.color }}
      />

      <Meta>
        <Name>{performer.name}</Name>
      </Meta>
    </Wrapper>
  );
};
