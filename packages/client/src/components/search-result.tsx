import React from 'react';
import { styled } from 'src/styles';
import * as G from 'src/generated/graphql';
import { Activity } from './activity';
import { PerformerCompact } from './performer-compact';
import { Team } from './team';

const Wrapper = styled.div``;

const List = styled.ul`
  margin-bottom: 8px;
`;

const ListItem = styled.li`
  padding: 8px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.borderNormal};
  background-color: ${({ theme }) => theme.backgroundNormal};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.borderNormal};
  }
`;

interface SearchResultProps {
  result?: G.SearchResultFragment;
}

export const SearchResult = (props: SearchResultProps) => {
  const { result } = props;

  if (!result) return null;

  return (
    <Wrapper>
      {result.categories.length ? (
        <List>
          {result.categories.map(category => (
            <ListItem key={category.id}>#{category.name}</ListItem>
          ))}
        </List>
      ) : null}

      {result.performers.length ? (
        <List>
          {result.performers.map(performer => (
            <ListItem key={performer.id}>
              <PerformerCompact performer={performer} />
            </ListItem>
          ))}
        </List>
      ) : null}

      {result.teams.length ? (
        <List>
          {result.teams.map(team => (
            <ListItem key={team.id}>
              <Team team={team} />
            </ListItem>
          ))}
        </List>
      ) : null}

      {result.activities.length ? (
        <List>
          {result.activities.map(activity => (
            <ListItem key={activity.id}>
              <Activity activity={activity} withDescription withPerforemer />
            </ListItem>
          ))}
        </List>
      ) : null}
    </Wrapper>
  );
};
