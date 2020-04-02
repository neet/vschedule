import React from 'react';
import { useTranslation } from 'react-i18next';
import throttle from 'lodash.throttle';
import { styled } from 'src/styles';
import { Team } from 'src/components/team';
import { Card } from 'src/components/card';
import { Page } from 'src/components/page';
import { LoadingIndicator } from 'src/components/loading-indicator';
import { useTeams } from 'src/hooks/use-teams';
import { Seo } from 'src/components/seo';

const Title = styled.h2`
  margin: 8px 0;
  font-size: 21px;
`;

const List = styled.ul`
  margin: 18px 0;
`;

const ListItem = styled.li`
  width: 100%;
  margin-bottom: 12px;
`;

export const Teams = React.memo(() => {
  const { t } = useTranslation();
  const { teams, loading, hasNextPage, onLoadNext } = useTeams();
  const handleLoadNext = throttle(onLoadNext, 3000, { trailing: false });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (
      !loading &&
      hasNextPage &&
      e.currentTarget.scrollHeight -
        (e.currentTarget.scrollTop + e.currentTarget.clientHeight) <
        600
    ) {
      return handleLoadNext();
    }

    return;
  };

  return (
    <>
      <Seo
        title={t('teams.page_title', {
          defaultValue: 'Collaboration of Nijisanji - Refined Itsukara.link',
        })}
        description={t('teams.description', {
          defaultValue: 'List of collaborations of Nijisanji',
        })}
      />

      <Page onScroll={handleScroll}>
        <Title>{t('teams.title', { defaultValue: 'Collaboration' })}</Title>
        <p>
          {t('teams.description', {
            defaultValue: 'List of collaborations of Nijisanji',
          })}
        </p>

        <List>
          {loading
            ? Array.from({ length: 10 }, (_, i) => (
                <ListItem key={`placeholder-${i}`}>
                  <Card>
                    <Team loading withPerformerNames />
                  </Card>
                </ListItem>
              ))
            : teams &&
              teams.map((team) => (
                <ListItem key={team.id}>
                  <Card>
                    <Team team={team} withPerformerNames />
                  </Card>
                </ListItem>
              ))}
        </List>

        {hasNextPage && <LoadingIndicator />}
      </Page>
    </>
  );
});
