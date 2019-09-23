import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { Menu } from 'react-feather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logoLarge from 'src/assets/logo-large.png';
import logoSmall from 'src/assets/logo-small.png';
import { styled } from 'src/styles';
import { bannerHeight } from 'src/styles/constants';
import {
  useToggleSidebarMutation,
  useFetchSidebarQuery,
} from 'src/generated/graphql';

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
`;

const LogoSmall = styled.img`
  display: block;
  height: 34px;
  margin: auto;
`;

const LogoLarge = styled.img`
  display: block;
  height: 30px;
  margin: 4px 0;
`;

const Title = styled.h1`
  display: none;
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

  ${LogoLarge} {
    display: none;
  }

  @media screen and (min-width: 700px) {
    ${LogoLarge} {
      display: block;
    }

    ${LogoSmall} {
      display: none;
    }
  }
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

const OriginalLink = styled.a`
  display: block;
  padding: 8px 14px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.highlightNormal};
  color: ${({ theme }) => theme.foregroundReverse};
  font-size: 12px;
  font-weight: bold;

  &:hover {
    text-decoration: none;
  }

  svg {
    margin-right: 0.5em;
  }
`;

export const Banner: React.SFC = React.memo(() => {
  const { t } = useTranslation();
  const { data } = useFetchSidebarQuery();
  const [toggleSidebar] = useToggleSidebarMutation();

  if (!data) {
    return null;
  }

  return (
    <Wrapper>
      <Hgroup>
        <MenuButton
          onClick={() =>
            toggleSidebar({
              variables: {
                expanded: !data.isSidebarExpanded,
              },
            })
          }
        >
          <Menu />
        </MenuButton>

        <Link to="/">
          <Title>Refined itsukara.link</Title>
          <LogoLarge src={logoLarge} alt="Refined itsukara.link" />
          <LogoSmall src={logoSmall} alt="Refiend itsukara.link" />
        </Link>
      </Hgroup>

      <Toolbox>
        <OriginalLink
          href="https://www.itsukaralink.jp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
          <span>
            {t('banner.open_original', { defaultValue: 'Open Original' })}
          </span>
        </OriginalLink>
      </Toolbox>
    </Wrapper>
  );
});
