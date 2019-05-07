// tslint:disable:no-import-side-effect
import 'jest-styled-components';
import * as React from 'react';
import { getLocale } from './locales';

getLocale();

// React-i18next
// See: https://react.i18next.com/misc/testing
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    // tslint:disable:function-name
    t() {
      return '';
    },
  }),

  withNamespaces: () => (Component: React.ComponentType) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => '' };

    return Component;
  },
}));
