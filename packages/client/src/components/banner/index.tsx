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
  height: 50px;
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

const Flex = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;

  @media screen and (min-width: 700px) {
    justify-content: flex-start;
    margin-left: auto;
  }
`;

const Toolbox = styled.div`
  display: none;
  flex: 1 0 auto;
  align-items: center;
  justify-content: flex-end;

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
      <MenuButton onClick={handleToggle}>
        <Menu />
      </MenuButton>

      <Flex>
        <Route path="/activities" component={DatePicker} />
      </Flex>

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
