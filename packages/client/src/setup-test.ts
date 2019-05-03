import { GlobalWithFetchMock } from 'jest-fetch-mock';
import 'jest-styled-components';
import { getLocale } from './locales';

getLocale();

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

// React-i18next
// See: https://react.i18next.com/misc/testing
jest.mock('react-i18next', () => ({
  withNamespaces: () => (Component: React.ComponentType) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => '' };
    return Component;
  },
}));
