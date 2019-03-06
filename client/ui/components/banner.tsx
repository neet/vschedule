import * as React from 'react';
import { styled } from '../styles';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Wrapper = styled.header`
  display: flex;
  position: relative;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 8px 18px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
`;

const Title = styled.h1`
  /* stylelint-disable */
  font-family: 'Avenir';
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: ${({ theme }) => theme.highlightNormal};
`;

const Toolbox = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 18px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 24px;
  margin: auto;
  color: ${({ theme }) => theme.highlightNormal};
`;

const OriginalLink = styled.div`
  padding: 8px 14px;
  font-size: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.highlightNormal};
  font-weight: bold;

  a {
    color: ${({ theme }) => theme.foregroundReverse};
  }

  svg {
    margin-right: 0.5em;
  }
`;

export const Banner = React.memo(() => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Title>refined Itsukara.link</Title>

      <Toolbox>
        <a
          href="https://twitter.com/thegodofneet"
          target="__blank"
          rel="noreferrer"
        >
          <Icon icon={faTwitter} />
        </a>

        <a
          href="https://github.com/neet/refined-itsukara-link"
          target="__blank"
          rel="noreferrer"
        >
          <Icon icon={faGithub} />
        </a>

        <OriginalLink>
          <a href="https://www.itsukaralink.jp">
            <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
            {t('banner.open_original', { defaultValue: 'Open Original' })}
          </a>
        </OriginalLink>
      </Toolbox>
    </Wrapper>
  );
});
