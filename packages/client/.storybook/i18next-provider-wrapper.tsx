/*
 * See: https://github.com/goooseman/storybook-addon-i18n#react-i18next
 */
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import React, { useEffect } from 'react';

export type I18nextProviderWrapperProps = {
  children: React.ReactChildren;
  i18n: i18next.i18n;
  locale: string;
};

export const I18nProviderWrapper = ({
  children,
  i18n,
  locale,
}: I18nextProviderWrapperProps) => {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
