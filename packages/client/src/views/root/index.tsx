import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Banner } from 'src/components/banner';
import { styled } from 'src/styles';
import { Contents } from 'src/views/contents';
import { GlobalStyle } from './global-style';

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
    <Wrapper>
      <Banner />

      <Switch>
        <Redirect exact from="/" to="/contents" />
        <Route path="/contents" component={Contents} />
      </Switch>

      <GlobalStyle />
    </Wrapper>
  );
});
