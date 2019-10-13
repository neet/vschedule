import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { Page } from 'src/components/page';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {t('not_found.page_title', {
            defaultValue: 'Not found - Refined Itsukara.link',
          })}
        </title>
      </Helmet>

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
