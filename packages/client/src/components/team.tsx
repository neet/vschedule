import querystring from 'querystring';
import React from 'react';
import { Link } from 'react-router-dom';
import { TeamFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { AvatarGroup } from './avatar-group';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`;

const StyledLink = styled(Link)`
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const Meta = styled.div`
  flex: 1 1 auto;
`;

const MemberNames = styled.p`
  color: ${({ theme }) => theme.foregroundLight};
`;

interface TeamProps {
  team: TeamFragment;
  withPerformerNames?: boolean;
}

export const Team = (props: TeamProps) => {
  const { team, withPerformerNames } = props;

  return (
    <Wrapper>
      <Meta>
        <StyledLink
          to={{
            pathname: '/activities',
            search: querystring.stringify({ team_id: team.id }),
          }}
        >
          <Title>{team.name}</Title>
        </StyledLink>

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
