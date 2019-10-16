import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { styled } from 'src/styles';
import { useFetchPerformersQuery } from 'src/generated/graphql';
import { Performer } from 'src/components/performer';
import { Page } from 'src/components/page';
import { Card } from 'src/components/card';

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

export const Performers = React.memo(() => {
  const { t } = useTranslation();
  const { data, loading } = useFetchPerformersQuery();

  return (
    <>
      <Helmet>
        <title>
          {t('performers.page_title', {
            defaultValue: 'Performers of Nijisanji - Refined Itsukara.link',
          })}
        </title>
      </Helmet>

      <Page>
        <Title>{t('performers.title', { defaultValue: 'Performers' })}</Title>
        <p>
          {t('performers.description', {
            defaultValue: 'List of performers that are belongs to Nijisanji',
          })}
        </p>

        <List>
          {loading
            ? Array.from({ length: 10 }, (_, i) => (
                <ListItem key={`placeholder-${i}`}>
                  <Card>
                    <Performer loading withDescription />
                  </Card>
                </ListItem>
              ))
            : data &&
              data.performers.nodes.map(performer => (
                <ListItem key={performer.id}>
                  <Card>
                    <Performer performer={performer} withDescription />
                  </Card>
                </ListItem>
              ))}
        </List>
      </Page>
    </>
  );
});
