import React from 'react';
import { TeamFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';

interface TeamProps {
  team: TeamFragment;
}

const Wrapper = styled.div`
  width: 240px;
  margin-right: 12px;
  margin-bottom: 12px;
  padding: 12px 18px;
  overflow: hidden;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
`;

const Title = styled.h3`
  font-size: 16px;
`;

const Members = styled.ul`
  display: flex;
`;

const Avatar = styled.img`
  width: 40px;
  height: auto;
  margin-right: -12px;
  border: 3px solid ${({ theme }) => theme.foregroundReverse};
  border-radius: 50%;
`;

export const Team = (props: TeamProps) => {
  const { team } = props;

  return (
    <Wrapper>
      <Title>{team.name}</Title>

      <Members>
        {team.members.map((member, i) => (
          <Avatar
            key={member.id}
            src={member.avatar}
            alt={member.name}
            style={{
              backgroundColor: member.color,
              zIndex: team.members.length - i,
            }}
          />
        ))}
      </Members>
    </Wrapper>
  );
};
