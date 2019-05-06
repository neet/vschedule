import typeDefs from '@ril/schema/schema.gql';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import introspectionResult from 'src/generated/introspection-result';
import { Root } from './views/root';

(async () => {
  if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install();
  }

  const mountNode = document.getElementById('root');

  if (!mountNode) {
    return;
  }

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResult,
  });

  const cache = new InMemoryCache({ fragmentMatcher });
  const link = new HttpLink({ uri: '/graphql' });
  const client = new ApolloClient({ cache, link, typeDefs });

  ReactDOM.render(
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </ApolloHooksProvider>
    </ApolloProvider>,
    mountNode,
  );
})();
