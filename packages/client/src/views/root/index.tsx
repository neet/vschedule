import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { styled } from 'src/styles';
import { Contents } from 'src/views/contents';
import { SidebarContainer } from 'src/containers/sidebar-container';
import { notFoundRender } from 'src/views/not-found';
import { GlobalStyle } from './global-style';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

export const Root: React.SFC = React.memo(() => {
  return (
    <Wrapper>
      <SidebarContainer />

      <Switch>
        <Redirect exact from="/" to="/activities" />
        <Route exact path="/activities" component={Contents} />
        <Route render={notFoundRender} />
      </Switch>

      <GlobalStyle />
    </Wrapper>
  );
});
