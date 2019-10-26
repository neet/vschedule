import { Menu, Search, X } from 'react-feather';
import React, { useState } from 'react';
import { styled } from 'src/styles';
import { Route } from 'react-router';
import { DatePicker } from 'src/components/date-picker';
import {
  SearchForm,
  Wrapper as SearchFormWrapper,
} from 'src/components/search-form';
import { Button } from 'src/components/button';
import { Today } from 'src/components/today';
import { useSidebar } from 'src/hooks/use-sidebar';

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
  const [showSearchForm, changeifShowSearchForm] = useState();
  const { toggle } = useSidebar();

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
          <Button appearance="skeleton" onClick={toggle}>
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
            <Today />
          </LargeTools>
        </>
      )}
    </Wrapper>
  );
};
