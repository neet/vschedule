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
import { rgba } from 'polished';
import { useTranslation } from 'react-i18next';
import { DatePicker } from './date-picker';

const Wrapper = styled.header`
  display: flex;
  position: relative;
  z-index: 999;
  box-sizing: border-box;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  /* height: ${bannerHeight}px; */
  padding: 8px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.borderNormal};
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

const MenuButton = styled.button`
  margin-right: 12px;
  padding: 0;
  border: none;
  background-color: transparent;
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

const Today = styled.button`
  box-sizing: border-box;
  min-width: 80px;
  padding: 8px 16px;
  transition: ease-out 0.15s;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.highlightNormal};
  box-shadow: 0 0 6px ${({ theme }) => rgba(theme.highlightNormal, 0.2)};
  color: ${({ theme }) => theme.foregroundReverse};
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    transition: ease-in 0.15s;
    box-shadow: 0 4px 12px ${({ theme }) => rgba(theme.highlightNormal, 0.2)};
  }
`;

export const Banner: React.SFC = React.memo(() => {
  const { t } = useTranslation();
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

  const handleClickToday = () => {
    const node = document.getElementById('minute-hand');
    if (!node || !(node instanceof Element)) return;
    node.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
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
            <DatePicker />

            <Today onClick={handleClickToday}>
              {t('banner.today', { defaultValue: 'Today' })}
            </Today>
          </Route>
        </Switch>
      </Toolbox>
    </Wrapper>
  );
});
