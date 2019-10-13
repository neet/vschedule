import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { styled } from 'src/styles';
import { SearchResult } from 'src/components/search-result';
import { useSearchQuery } from 'src/generated/graphql';
import { useTranslation } from 'react-i18next';

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
  const { query } = useParams<{ query: string }>();
  const { data } = useSearchQuery({ variables: { query } });

  return (
    <>
      <Helmet>
        {t('search.page_title', {
          defaultValue: 'Search result for "{{value}}" - Refined Itsukara.link',
          value: query,
        })}
      </Helmet>

      <Wrapper>
        <Inner>
          <Title>
            {t('search.result', {
              defaultValue: 'Search result for "{{value}}"',
              value: query,
            })}
          </Title>

          <SearchResult result={data && data.search} />
        </Inner>
      </Wrapper>
    </>
  );
};
