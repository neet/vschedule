import React from 'react';
import { useTranslation } from 'react-i18next';
import throttle from 'lodash.throttle';
import { usePerformers } from 'src/hooks/use-performers';
import { styled } from 'src/styles';
import { Performer } from 'src/components/performer';
import { Page } from 'src/components/page';
import { Card } from 'src/components/card';
import { LoadingIndicator } from 'src/components/loading-indicator';
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

export const Performers = React.memo(() => {
  const { t } = useTranslation();
  const { performers, loading, hasNextPage, onLoadNext } = usePerformers();
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
        title={t('performers.page_title', {
          defaultValue: 'Performers of Nijisanji - Refined Itsukara.link',
        })}
        description={t('performers.description', {
          defaultValue: 'List of performers that are belongs to Nijisanji',
        })}
      />

      <Page onScroll={handleScroll}>
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
            : performers &&
              performers.map(node => (
                <ListItem key={node.id}>
                  <Card>
                    <Performer performer={node} withDescription />
                  </Card>
                </ListItem>
              ))}
        </List>

        {hasNextPage && <LoadingIndicator />}
      </Page>
    </>
  );
});
