import React from 'react';
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
  width: 1080px;
  margin: auto;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 24px 0;
`;

export const Performers = React.memo(() => {
  const { t } = useTranslation();
  const { data } = useFetchPerformersQuery();

  if (!data) return null;

  return (
    <Wrapper>
      <Inner>
        <h2>{t('performers.title', { defaultValue: 'Performers' })}</h2>
        <p>
          {t('performers.description', {
            defaultValue: 'List of performers that are belongs to Nijisanji',
          })}
        </p>

        <List>
          {data.performers.nodes.map(performer => (
            <Performer key={performer.id} performer={performer} />
          ))}
        </List>
      </Inner>
    </Wrapper>
  );
});
