import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { styled } from 'src/styles';
import { Activities } from 'src/views/activities';
import { notFoundRender } from 'src/views/not-found';
import { Performers } from 'src/views/performers';
import { SidebarContainer } from 'src/containers/sidebar-container';
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
        <Route exact path="/activities" component={Activities} />
        <Route exact path="/performers" component={Performers} />
        <Route render={notFoundRender} />
      </Switch>

      <GlobalStyle />
    </Wrapper>
  );
});
