import typeDefs from '@ril/schema';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import introspectionResult from 'src/generated/introspection-result';
import { ThemeProvider } from 'src/styles';
import { theme } from 'src/styles/theme';
import { createI18n, initDayjs } from 'src/utils/locale';
import { Root } from './views/root';

(async () => {
  if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install();
  }

  const mountNode = document.getElementById('root');
  if (!mountNode) return;

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResult,
  });

  const cache = new InMemoryCache({ fragmentMatcher }).restore(
    (window as any).__APOLLO_STATE__,
  );

  const client = new ApolloClient({
    cache,
    typeDefs,
    link: new HttpLink({ uri: '/graphql' }),
    ssrForceFetchDelay: 100,
  });

  initDayjs();
  const i18n = createI18n();

  ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <Root />
          </ThemeProvider>
        </I18nextProvider>
      </BrowserRouter>
    </ApolloProvider>,
    mountNode,
  );
})();
