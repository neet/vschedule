import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryParam, StringParam } from 'use-query-params';
import { styled } from 'src/styles';
import { Page } from 'src/components/page';
import { Seo } from 'src/components/seo';
import { Result } from './result';

const Title = styled.h2`
  margin: 8px 0;
  font-size: 21px;
`;

export const Search = () => {
  const { t } = useTranslation();
  const [q] = useQueryParam('q', StringParam);
  if (!q) return null;

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

        <Result q={q} />
      </Page>
    </>
  );
};
