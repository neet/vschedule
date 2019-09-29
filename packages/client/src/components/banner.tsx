import { Menu } from 'react-feather';
import React from 'react';
import { styled } from 'src/styles';
import { bannerHeight } from 'src/styles/constants';
import {
  useToggleSidebarMutation,
  useFetchSidebarQuery,
} from 'src/generated/graphql';
import { SearchFormContainer } from 'src/containers/search-form-container';
import { Route, Switch } from 'react-router';
import dayjs from 'dayjs';

const Wrapper = styled.header`
  display: flex;
  position: relative;
  z-index: 999;
  box-sizing: border-box;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${bannerHeight};
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.borderNormal};
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

const MenuButton = styled.button`
  margin: 0 12px;
  padding: 0;
  border: none;
  background-color: none;
  color: ${({ theme }) => theme.foregroundLight};
`;

const Hgroup = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

const Toolbox = styled.div`
  display: none;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 18px;
  }

  @media screen and (min-width: 700px) {
    display: flex;
  }
`;

const Datepicker = styled.div`
  background-color: ${({ theme }) => theme.backgroundNormal};
  color: ${({ theme }) => theme.foregroundNormal};
  font-size: 16px;
  font-weight: bold;
`;

export const Banner: React.SFC = React.memo(() => {
  const { data } = useFetchSidebarQuery();
  const [toggleSidebar] = useToggleSidebarMutation();

  if (!data) {
    return null;
  }

  const handleToggle = () => {
    toggleSidebar({
      variables: {
        expanded: !data.isSidebarExpanded,
      },
    });
  };

  return (
    <Wrapper>
      <Hgroup>
        <MenuButton onClick={handleToggle}>
          <Menu />
        </MenuButton>

        <SearchFormContainer />
      </Hgroup>

      <Toolbox>
        <Switch>
          <Route path="/activities">
            <Datepicker>{dayjs().format('LL')}</Datepicker>
          </Route>
        </Switch>
      </Toolbox>
    </Wrapper>
  );
});
