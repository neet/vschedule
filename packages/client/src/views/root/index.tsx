import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { styled } from 'src/styles';
import { Activities } from 'src/views/activities';
import { renderNotFound } from 'src/views/not-found';
import { Performers } from 'src/views/performers';
import { Teams } from 'src/views/teams';
import { Search } from 'src/views/search';
import { Banner } from 'src/components/banner';
import { Sidebar } from 'src/components/sidebar';
import { GlobalStyle } from 'src/styles/global-style';

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
  return (
    <>
      <GlobalStyle />

      <Wrapper>
        <Sidebar />

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
    </>
  );
};
