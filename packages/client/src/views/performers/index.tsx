import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { styled } from 'src/styles';
import { useFetchPerformersQuery } from 'src/generated/graphql';
import { Performer } from 'src/components/performer';

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

const Title = styled.h2`
  margin: 18px 0;
  font-size: 21px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
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

export const Performers = React.memo(() => {
  const { t } = useTranslation();
  const { data } = useFetchPerformersQuery();

  if (!data) return null;

  return (
    <>
      <Helmet>
        <title>
          {t('performers.page_title', {
            defaultValue: 'Performers of Nijisanji - Refined Itsukara.link',
          })}
        </title>
      </Helmet>

      <Wrapper>
        <Inner>
          <Title>{t('performers.title', { defaultValue: 'Performers' })}</Title>
          <p>
            {t('performers.description', {
              defaultValue: 'List of performers that are belongs to Nijisanji',
            })}
          </p>

          <List>
            {data.performers.nodes.map(performer => (
              <ListItem key={performer.id}>
                <Performer performer={performer} withDescription />
              </ListItem>
            ))}
          </List>
        </Inner>
      </Wrapper>
    </>
  );
});
