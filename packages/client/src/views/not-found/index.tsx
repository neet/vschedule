import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { Page } from 'src/components/page';
import { Seo } from 'src/components/seo';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title={t('not_found.page_title', {
          defaultValue: 'Not found - Refined Itsukara.link',
        })}
      />

      <Page>
        {t('not_found.description', { defaultValue: 'You hit the void' })}
      </Page>
    </>
  );
};

export const renderNotFound = (props: RouteComponentProps) => {
  const { staticContext } = props;

  if (staticContext) {
    staticContext.statusCode = 404;
  }

  return <NotFound />;
};
