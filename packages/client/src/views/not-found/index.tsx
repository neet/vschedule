import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { Page } from 'src/components/page';

export const NotFound = React.memo(() => {
  const { t } = useTranslation();

  return (
    <Page>{t('not_found.title', { defaultValue: 'Page Not Found' })}</Page>
  );
});

export const notFoundRender = ({ staticContext }: RouteComponentProps) => {
  if (staticContext) {
    staticContext.statusCode = 404;
  }

  return <NotFound />;
};
