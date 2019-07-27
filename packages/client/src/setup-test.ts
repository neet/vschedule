// eslint-disable-next-line import/no-unassigned-import
import 'jest-styled-components';
import React from 'react';
import { initDayjs } from './utils/locale';

initDayjs();

// React-i18next
// See: https://react.i18next.com/misc/testing
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t() {
      return '';
    },
  }),

  withNamespaces: () => (Component: React.ComponentType) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => '' };

    return Component;
  },
}));
