import querystring from 'querystring';
import React from 'react';
import { TeamFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { Link } from 'react-router-dom';

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
`;

const Avatar = styled.img`
  width: 40px;
  height: auto;
  margin-right: -18px;
  border: 3px solid ${({ theme }) => theme.foregroundReverse};
  border-radius: 50%;
`;

interface TeamProps {
  team: TeamFragment;
  showNames?: boolean;
}

export const Team = (props: TeamProps) => {
  const { team, showNames } = props;

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

        {showNames && (
          <MemberNames>
            {team.members.map(member => member.name).join(', ')}
          </MemberNames>
        )}
      </Meta>

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
