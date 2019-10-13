import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { styled } from 'src/styles';
import { useFetchTeamsQuery } from 'src/generated/graphql';
import { Team } from 'src/components/team';

const Wrapper = styled.article`
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  overflow: scroll;
`;

const Inner = styled.div`
  width: 700px;
  margin: auto;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 24px 0;
`;

const ListItem = styled.li`
  width: 100%;
  margin-right: 12px;
  margin-bottom: 12px;
  padding: 12px 18px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
`;

export const Teams = React.memo(() => {
  const { t } = useTranslation();
  const { data } = useFetchTeamsQuery();

  if (!data) return null;

  return (
    <>
      <Helmet>
        <title>
          {t('teams.page_title', {
            defaultValue: 'Collaboration of Nijisanji - Refined Itsukara.link',
          })}
        </title>
      </Helmet>

      <Wrapper>
        <Inner>
          <h2>{t('teams.title', { defaultValue: 'Collaboration' })}</h2>
          <p>
            {t('teams.description', {
              defaultValue: 'List of collaborations of Nijisanji',
            })}
          </p>

          <List>
            {data.teams.nodes.map(team => (
              <ListItem key={team.id}>
                <Team team={team} showNames />
              </ListItem>
            ))}
          </List>
        </Inner>
      </Wrapper>
    </>
  );
});
