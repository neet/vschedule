import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'src/styles';
import { useFetchTeamsQuery, TeamFragment } from 'src/generated/graphql';
import { Team } from 'src/components/team';

const Wrapper = styled.article`
  width: 1080px;
  margin: 0 auto;
  padding: 24px;
  overflow: scroll;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 24px 0;
`;

export const Teams = React.memo(() => {
  const { t } = useTranslation();
  const { data } = useFetchTeamsQuery();

  if (!data) return null;

  return (
    <Wrapper>
      <h2>{t('teams.title', { defaultValue: 'Collaboration' })}</h2>
      <p>
        {t('teams.description', {
          defaultValue: 'List of collaborations of Nijisanji',
        })}
      </p>

      <List>
        {data.teams.nodes
          .filter((node): node is TeamFragment => !!node)
          .map(team => (
            <Team key={team.id} team={team} />
          ))}
      </List>
    </Wrapper>
  );
});
