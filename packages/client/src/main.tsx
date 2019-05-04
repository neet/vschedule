import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo-hooks';
import { Root } from './views/root';
import { BrowserRouter } from 'react-router-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import typeDefs from '@ril/schema/schema.gql';

async () => {
  if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install();
  }

  const mountNode = document.getElementById('root');

  if (!mountNode) {
    return;
  }

  const cache = new InMemoryCache();
  const link = new HttpLink({ uri: 'https://localhost:3000/graphql' });
  const client = new ApolloClient({ cache, link, typeDefs });

  ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ApolloProvider>,
    mountNode,
  );
};
