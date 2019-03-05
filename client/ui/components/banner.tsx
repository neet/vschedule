import * as React from 'react';
import { styled } from '../styles';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';

export const Wrapper = styled.header`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.bannerBackground};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  height: 100%;
  margin: auto;
  color: ${({ theme }) => theme.foregroundReverse};
`;

export const Title = styled.div`
  font-family: 'Avenir';
  font-size: 32;
  font-weight: 500;

  span {
    margin-right: 0.25em;
    color: ${({ theme }) => theme.highlightNormal};
  }
`;

export const OriginalLink = styled.div`
  padding: 8px 18px;
  border-radius: 99px;
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
      <Inner>
        <Title>
          <h1>
            <span>refined</span>
            Itsukara.link
          </h1>
        </Title>

        <OriginalLink>
          <a href="https://www.itsukaralink.jp">
            <FontAwesomeIcon icon={faExternalLinkSquareAlt } />
            {t('banner.open_original', { defaultValue: 'Open Original' })}
          </a>
        </OriginalLink>
      </Inner>
    </Wrapper>
  );
});
