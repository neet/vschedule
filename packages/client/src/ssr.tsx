import { dom } from '@fortawesome/fontawesome-svg-core';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import {
  ApolloProvider as ApolloHooksProvider,
  getMarkupFromTree,
} from 'react-apollo-hooks';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { Html } from './components/html';
import introspectionResult from './generated/introspection-result';
import { Root } from './views/root';

export interface SSRParams {
  location: string;
  manifest: { [K: string]: string };
}

// tslint:disable-next-line:no-default-export function-name
export default async function SSR(params: SSRParams) {
  const uri = `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${
    process.env.APP_PORT
  }/graphql`;

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResult,
  });

  const client = new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri,
      fetch: (fetch as any) as GlobalFetch['fetch'],
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache({ fragmentMatcher }),
  });
  const context = {};
  const sheet = new ServerStyleSheet();

  const App = (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <StaticRouter location={params.location} context={context}>
          <StyleSheetManager sheet={sheet.instance}>
            <Root />
          </StyleSheetManager>
        </StaticRouter>
      </ApolloHooksProvider>
    </ApolloProvider>
  );

  const content = await getMarkupFromTree({
    renderFunction: ReactDOMServer.renderToString,
    tree: App,
  });
  const additionalElements = sheet.getStyleElement();
  const styles = dom.css();

  return ReactDOMServer.renderToStaticMarkup(
    <Html
      state={client.extract()}
      elements={additionalElements}
      content={content}
      styles={styles}
      manifest={params.manifest}
    />,
  );
}
