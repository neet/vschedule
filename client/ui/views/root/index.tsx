import * as React from 'react';
import { ThemeProvider, styled } from 'client/ui/styles';
import { I18nextProvider } from 'react-i18next';
import { Switch, Redirect, Route } from 'react-router-dom';
import { getLocale } from 'client/ui/locales';
import { theme } from 'client/ui/styles/theme';
import { Events } from 'client/ui/views/events';
import { Banner } from 'client/ui/components/banner';
import { GlobalStyle } from './global-style';

const locale = getLocale();

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

export const Root: React.SFC = React.memo(() => {
  return (
    <I18nextProvider i18n={locale}>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Banner />

          <Switch>
            <Redirect exact from="/" to="/events" />
            <Route path="/events" component={Events} />
          </Switch>

          <GlobalStyle />
        </Wrapper>
      </ThemeProvider>
    </I18nextProvider>
  );
});
