import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import NoSSR from 'react-no-ssr';
import { styled, ThemeContext } from 'src/styles';
import { Activities } from 'src/views/activities';
import { renderNotFound } from 'src/views/not-found';
import { Performers } from 'src/views/performers';
import { Teams } from 'src/views/teams';
import { Search } from 'src/views/search';
import { Banner } from 'src/components/banner';
import { GlobalStyle } from 'src/styles/global-style';
import { Seo } from 'src/components/seo';
import { GettingStarted } from 'src/components/getting-started';

const Wrapper = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.backgroundWash};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Root = () => {
  const { t } = useTranslation();

  const theme = useContext(ThemeContext);
  const rootUrl = process.env.PUBLIC_URL;

  return (
    <>
      <Seo
        title={t('meta.title', {
          defaultValue: 'Refined Itsukara.link',
        })}
        description={t('meta.description', {
          defaultValue: '✨ itsukara.link with refined interface!',
        })}
      />

      <Helmet>
        <meta name="theme-color" content={theme.highlightNormal} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="mask-icon"
          href="/mask-icon.svg"
          color={theme.highlightNormal}
        />

        <meta
          name="apple-mobile-web-app-title"
          content={t('meta.title', {
            defaultValue: 'Refined Itsukara.link',
          })}
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:url" content={rootUrl} />
        <meta property="og:image" content={`${rootUrl}/screenshot.png`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Wrapper>
        <Content>
          <Banner />
          <Switch>
            <Redirect exact from="/" to="/activities" />
            <Route exact path="/activities" component={Activities} />
            <Route exact path="/performers" component={Performers} />
            <Route exact path="/teams" component={Teams} />
            <Route path="/search" component={Search} />
            <Route render={renderNotFound} />
          </Switch>
        </Content>
      </Wrapper>

      <GlobalStyle />

      <NoSSR>
        <GettingStarted />
      </NoSSR>
    </>
  );
};
