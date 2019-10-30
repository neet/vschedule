import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'src/styles';
import {
  SearchForm,
  Wrapper as SearchFormWrapper,
} from 'src/components/search-form';
import { Navigation } from 'src/components/navigation';
import { Link } from 'react-router-dom';
import logo from '@ril/arts/static/logo-small.png';

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

const RightInner = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;

  & > *:not(:last-child) {
    margin-right: 18px;
  }

  ${SearchFormWrapper} {
    width: 320px;
  }

  @media screen and (min-width: 700px) {
    justify-content: flex-start;
    margin-left: auto;
  }
`;

const Logo = styled.img`
  width: auto;
  height: 30px;
`;

const LeftInner = styled.div`
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

  return (
    <Wrapper>
      <RightInner>
        <Link to="/">
          <Logo
            src={logo}
            alt={t('meta.title', { defaultValue: 'Refined Itsukara.link' })}
          />
        </Link>

        <SearchForm withResult />
      </RightInner>

      <LeftInner>
        <Navigation />
      </LeftInner>
    </Wrapper>
  );
};
