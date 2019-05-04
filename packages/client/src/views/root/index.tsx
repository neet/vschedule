import * as React from 'react';
import { ThemeProvider, styled } from 'src/styles';
import { I18nextProvider } from 'react-i18next';
import { Switch, Redirect, Route } from 'react-router-dom';
import { getLocale } from 'src/locales';
import { theme } from 'src/styles/theme';
import { Contents } from 'src/views/contents';
import { Banner } from 'src/components/banner';
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
            <Redirect exact from="/" to="/contents" />
            <Route path="/contents" component={Contents} />
          </Switch>

          <GlobalStyle />
        </Wrapper>
      </ThemeProvider>
    </I18nextProvider>
  );
});
