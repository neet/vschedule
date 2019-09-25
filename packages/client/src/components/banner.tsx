import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { Menu } from 'react-feather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
