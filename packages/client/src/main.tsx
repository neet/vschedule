import typeDefs from '@ril/schema';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Route } from 'react-router-dom';
import { createI18n } from 'src/utils/locale';
import { HttpLink } from 'apollo-link-http';
import { I18nextProvider } from 'react-i18next';
import { QueryParamProvider } from 'use-query-params';
import { theme } from 'src/styles/theme';
import { ThemeProvider } from 'src/styles';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import introspectionResult from 'src/generated/introspection-result';
import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './views/root';
import { LocalStateProvider } from './context';

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

  const i18n = createI18n();

  ReactDOM.render(
    <LocalStateProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <QueryParamProvider ReactRouterRoute={Route}>
            <I18nextProvider i18n={i18n}>
              <ThemeProvider theme={theme}>
                <Root />
              </ThemeProvider>
            </I18nextProvider>
          </QueryParamProvider>
        </BrowserRouter>
      </ApolloProvider>
    </LocalStateProvider>,
    mountNode,
  );
})();
