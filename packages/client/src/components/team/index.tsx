import querystring from 'querystring';
import React from 'react';
import { Link } from 'react-router-dom';
import { TeamFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { AvatarGroup } from 'src/components/avatar-group';

const Name = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const Meta = styled.div`
  flex: 1 1 auto;
`;

const MemberNames = styled.p`
  color: ${({ theme }) => theme.foregroundLight};
`;

const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.foregroundNormal};

  &:hover {
    text-decoration: none;

    ${Name} {
      text-decoration: underline;
    }
  }
`;

interface TeamProps {
  team: TeamFragment;
  withPerformerNames?: boolean;
}

export const Team = (props: TeamProps) => {
  const { team, withPerformerNames } = props;

  return (
    <Wrapper
      to={{
        pathname: '/activities',
        search: querystring.stringify({ team_id: team.id }),
      }}
    >
      <Meta>
        <Name>{team.name}</Name>

        {withPerformerNames && (
          <MemberNames>
            {team.members.map(member => member.name).join(', ')}
          </MemberNames>
        )}
      </Meta>

      <AvatarGroup
        performers={team.members}
        size={40}
        align="right"
        background="performerColor"
        gap={-18}
      />
    </Wrapper>
  );
};
