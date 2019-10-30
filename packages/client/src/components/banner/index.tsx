import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'src/styles';
import {
  SearchForm,
  Wrapper as SearchFormWrapper,
} from 'src/components/search-form';
import { Navigation } from 'src/components/navigation';
import { Link } from 'react-router-dom';
import logo from '@ril/arts/static/logo-small.png';
import { Menu, Search } from 'react-feather';
import { Button } from 'src/components/button';
import { Modal as DefaultModal } from 'react-overlays';
import { BANNER, MODAL } from 'src/styles/z-indices';

const Wrapper = styled.header`
  display: flex;
  position: relative;
  z-index: ${BANNER};
  box-sizing: border-box;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 50px;
  padding: 8px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.borderNormal};
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

const LeftInner = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: flex-start;

  & > a {
    margin-right: 18px;
  }

  ${SearchFormWrapper} {
    width: 320px;
  }

  & > a,
  ${SearchFormWrapper} {
    display: none;

    @media screen and (min-width: 700px) {
      display: block;
    }
  }

  & > button {
    display: block;

    @media screen and (min-width: 700px) {
      display: none;
    }
  }

  @media screen and (min-width: 700px) {
    justify-content: flex-start;
    margin-left: auto;
  }
`;

const CentreInner = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 700px) {
    display: none;
  }
`;

const LogoImage = styled.img`
  width: auto;
  height: 30px;
`;

const RightInner = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: flex-end;

  nav {
    display: none;

    @media screen and (min-width: 700px) {
      display: block;
    }
  }

  & > button {
    display: block;

    @media screen and (min-width: 700px) {
      display: none;
    }
  }
`;

const Modal = styled(DefaultModal)`
  position: fixed;
  z-index: ${MODAL};
  top: 0;
  left: 0;
  box-sizing: border-box;
  min-width: 70%;
  height: 100%;
  padding: 21px;
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

const Backdrop = styled.div`
  position: fixed;
  z-index: ${MODAL - 1};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Logo = () => {
  const { t } = useTranslation();

  return (
    <Link to="/">
      <LogoImage
        src={logo}
        alt={t('meta.title', { defaultValue: 'Refined Itsukara.link' })}
      />
    </Link>
  );
};

export const Banner = () => {
  const [showModalNav, setShowModalNav] = useState(false);

  return (
    <Wrapper>
      <LeftInner>
        {/* Desktop */}
        <Logo />
        <SearchForm withResult />

        {/* Mobile */}
        <Button appearance="skeleton">
          <Menu onClick={() => setShowModalNav(true)} />
        </Button>
      </LeftInner>

      {/* Mobile */}
      <CentreInner>
        <Logo />
      </CentreInner>

      <RightInner>
        {/* Desktop */}
        <Navigation />

        {/* Mobile */}
        <Button appearance="skeleton">
          <Search />
        </Button>
      </RightInner>

      <Modal
        show={showModalNav}
        onHide={() => setShowModalNav(false)}
        renderBackdrop={props => <Backdrop {...props} />}
      >
        <Navigation />
      </Modal>
    </Wrapper>
  );
};
