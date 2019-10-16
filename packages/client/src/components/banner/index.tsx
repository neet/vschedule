import { Activity, Menu } from 'react-feather';
import React from 'react';
import { styled } from 'src/styles';
import {
  useToggleSidebarMutation,
  useFetchSidebarQuery,
} from 'src/generated/graphql';
import { Route } from 'react-router';
import { useTranslation } from 'react-i18next';
import { DatePicker } from 'src/components/date-picker';
import { SearchForm } from 'src/components/search-form';
import { Button } from 'src/components/button';

const Wrapper = styled.header`
  display: flex;
  position: relative;
  z-index: 999;
  box-sizing: border-box;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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

export const Banner = () => {
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
    const node = document.getElementById('now');
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

        <Route path="/activities" component={DatePicker} />
      </Hgroup>

      <Toolbox>
        <SearchForm />

        <Button onClick={handleClickToday}>
          <Activity size={14} />
          {t('banner.today', { defaultValue: 'Today' })}
        </Button>
      </Toolbox>
    </Wrapper>
  );
};
