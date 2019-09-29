import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'src/styles';
import {
  useFetchPerformersQuery,
  PerformerFragment,
} from 'src/generated/graphql';
import { Performer } from 'src/components/performer';

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

export const Performers = React.memo(() => {
  const { t } = useTranslation();
  const { data } = useFetchPerformersQuery();

  if (!data) return null;

  return (
    <Wrapper>
      <h2>{t('performers.title', { defaultValue: 'Performers' })}</h2>
      <p>
        {t('performers.description', {
          defaultValue: 'List of performers that are belongs to Nijisanji',
        })}
      </p>

      <List>
        {data.performers.nodes
          .filter((node): node is PerformerFragment => !!node)
          .map(performer => (
            <Performer key={performer.id} performer={performer} />
          ))}
      </List>
    </Wrapper>
  );
});
