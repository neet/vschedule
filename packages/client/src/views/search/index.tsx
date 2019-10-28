import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryParam, StringParam } from 'use-query-params';
import { styled } from 'src/styles';
import { SearchResult } from 'src/components/search-result';
import { useSearchQuery } from 'src/generated/graphql';
import { Page } from 'src/components/page';
import { Seo } from 'src/components/seo';

const Title = styled.h2`
  margin: 8px 0;
  font-size: 21px;
`;

const Container = styled.div`
  margin: 18px 0;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
`;

export const Search = () => {
  const { t } = useTranslation();
  const [q = ''] = useQueryParam('q', StringParam);
  const { data } = useSearchQuery({ variables: { query: q } });

  if (!data || !data.search) {
    return null;
  }

  return (
    <>
      <Seo
        title={t('search.page_title', {
          defaultValue: 'Search result for "{{value}}" - Refined Itsukara.link',
          value: q,
        })}
      />

      <Page>
        <Title>
          {t('search.result', {
            defaultValue: 'Search result for "{{value}}"',
            value: q,
          })}
        </Title>

        <Container>
          <SearchResult result={data.search} withGroupTitle />
        </Container>
      </Page>
    </>
  );
};
