import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logoLarge from 'src/assets/logo-large.png';
import logoSmall from 'src/assets/logo-small.png';
import { styled } from 'src/styles';
import { bannerHeight } from 'src/styles/constants';

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
  padding: 8px 18px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
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

const Hgroup = styled.div`
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

const Icon = styled(FontAwesomeIcon)`
  margin: auto;
  color: ${({ theme }) => theme.highlightNormal};
  font-size: 24px;
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

  return (
    <Wrapper>
      <Hgroup>
        <Link to="/">
          <Title>Refined itsukara.link</Title>
          <LogoLarge src={logoLarge} alt="Refined itsukara.link" />
          <LogoSmall src={logoSmall} alt="Refiend itsukara.link" />
        </Link>
      </Hgroup>

      <Toolbox>
        <a
          href="https://twitter.com/thegodofneet"
          target="_blank"
          rel="noopener noreferrer"
          title={t('banner.view_twitter', {
            defaultValue: 'View Twitter',
          })}
          aria-label={t('banner.view_twitter', {
            defaultValue: 'View Twitter',
          })}
        >
          <Icon icon={faTwitter} />
        </a>

        <a
          href="https://github.com/neet/refined-itsukara-link"
          target="_blank"
          rel="noopener noreferrer"
          title={t('banner.view_source', { defaultValue: 'View Source' })}
          aria-label={t('banner.view_source', { defaultValue: 'View Source' })}
        >
          <Icon icon={faGithub} />
        </a>

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
