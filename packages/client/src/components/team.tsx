import querystring from 'querystring';
import React from 'react';
import { Link } from 'react-router-dom';
import { TeamFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { Avatar } from './avatar';

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

const Title = styled.h3`
  font-size: 16px;
`;

const Meta = styled.div`
  flex: 1 1 auto;
`;

const MemberNames = styled.p`
  color: ${({ theme }) => theme.foregroundLight};
`;

const Members = styled.ul`
  display: flex;
  flex: 0 0 auto;
  margin-right: 18px;

  & > a {
    margin-right: -18px;
    border: 3px solid ${({ theme }) => theme.foregroundReverse};
  }
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

      <Members>
        {team.members.map(member => (
          <Avatar
            key={member.id}
            performer={member}
            size={40}
            background="performerColor"
          />
        ))}
      </Members>
    </Wrapper>
  );
};
