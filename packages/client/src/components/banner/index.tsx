import { Menu, Search, X } from 'react-feather';
import React, { useState } from 'react';
import { styled } from 'src/styles';
import {
  useToggleSidebarMutation,
  useFetchSidebarQuery,
} from 'src/generated/graphql';
import { Route } from 'react-router';
import { useTranslation } from 'react-i18next';
import { DatePicker } from 'src/components/date-picker';
import {
  SearchForm,
  Wrapper as SearchFormWrapper,
} from 'src/components/search-form';
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

  & > *:not(:first-child) {
    margin-left: 12px;
  }
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  & > *:not(:last-child) {
    margin-right: 18px;
  }

  ${SearchFormWrapper} {
    flex: 1 0 auto;
  }
`;

const Flex = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 700px) {
    justify-content: flex-start;
    margin-left: auto;
  }
`;

const CompactTools = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (min-width: 700px) {
    display: none;
  }
`;

const LargeTools = styled.div`
  display: none;
  flex: 1 0 auto;
  align-items: center;
  justify-content: flex-end;

  & > *:not(:last-child) {
    margin-right: 18px;
  }

  ${SearchFormWrapper} {
    width: 320px;
  }

  @media screen and (min-width: 700px) {
    display: flex;
  }
`;

export const Banner = () => {
  const { t } = useTranslation();
  const { data } = useFetchSidebarQuery();
  const [toggleSidebar] = useToggleSidebarMutation();
  const [showSearchForm, changeifShowSearchForm] = useState();

  if (!data) {
    return null;
  }

  const handleToggleMenu = () => {
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
      {showSearchForm ? (
        <Inner>
          <SearchForm />

          <Button
            appearance="skeleton"
            onClick={() => changeifShowSearchForm(false)}
          >
            <X />
          </Button>
        </Inner>
      ) : (
        <>
          <Button appearance="skeleton" onClick={handleToggleMenu}>
            <Menu />
          </Button>

          <Flex>
            <Route path="/activities" component={DatePicker} />
          </Flex>

          <CompactTools>
            <Button
              appearance="skeleton"
              onClick={() => changeifShowSearchForm(true)}
            >
              <Search />
            </Button>
          </CompactTools>

          <LargeTools>
            <SearchForm withResult />

            <Button appearance="primary" onClick={handleClickToday}>
              {t('banner.today', { defaultValue: 'Today' })}
            </Button>
          </LargeTools>
        </>
      )}
    </Wrapper>
  );
};
