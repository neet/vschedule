import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Banner } from 'src/components/banner';
import { getLocale } from 'src/locales';
import { styled, ThemeProvider } from 'src/styles';
import { theme } from 'src/styles/theme';
import { Contents } from 'src/views/contents';
import { GlobalStyle } from './global-style';

const locale = getLocale();

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${props => props.theme.backgroundNormal};
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
