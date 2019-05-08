import { dom } from '@fortawesome/fontawesome-svg-core';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import i18next from 'i18next';
import fetch from 'node-fetch';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import {
  ApolloProvider as ApolloHooksProvider,
  getMarkupFromTree,
} from 'react-apollo-hooks';
import ReactDOMServer from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { StaticRouter } from 'react-router-dom';
import { ThemeProvider } from 'src/styles';
import { theme } from 'src/styles/theme';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { Html } from './components/html';
import introspectionResult from './generated/introspection-result';
import { initDayjs } from './utils/locale';
import { Root } from './views/root';

export interface SSRParams {
  /** i18next instance */
  i18n: i18next.i18n;
  /** Request pathname */
  location: string;
  /** Built files manifest */
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

  initDayjs();

  const App = (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <StaticRouter location={params.location} context={context}>
          <StyleSheetManager sheet={sheet.instance}>
            <I18nextProvider i18n={params.i18n}>
              <ThemeProvider theme={theme}>
                <Root />
              </ThemeProvider>
            </I18nextProvider>
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
    // We need to use i18next/styled-components
    // in the Html component
    <I18nextProvider i18n={params.i18n}>
      <ThemeProvider theme={theme}>
        <Html
          state={client.extract()}
          elements={additionalElements}
          content={content}
          styles={styles}
          manifest={params.manifest}
        />
      </ThemeProvider>
    </I18nextProvider>,
  );
}
