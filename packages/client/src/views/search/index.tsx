import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useQueryParam, StringParam } from 'use-query-params';
import { styled } from 'src/styles';
import { SearchResult } from 'src/components/search-result';
import { useSearchQuery } from 'src/generated/graphql';

const Wrapper = styled.div`
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.backgroundWash};
`;

const Inner = styled.div`
  width: 700px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 18px 0;
  font-size: 21px;
`;

export const Search = () => {
  const { t } = useTranslation();
  const [q = ''] = useQueryParam('q', StringParam);
  const { data } = useSearchQuery({ variables: { query: q } });

  return (
    <>
      <Helmet>
        {t('search.page_title', {
          defaultValue: 'Search result for "{{value}}" - Refined Itsukara.link',
          value: q,
        })}
      </Helmet>

      <Wrapper>
        <Inner>
          <Title>
            {t('search.result', {
              defaultValue: 'Search result for "{{value}}"',
              value: q,
            })}
          </Title>

          <SearchResult result={data && data.search} />
        </Inner>
      </Wrapper>
    </>
  );
};
