import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { styled } from 'src/styles';
import { NavLink } from 'react-router-dom';
import { Tv, User, Users, Hash } from 'react-feather';

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  width: 230px;
  height: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.borderNormal};
  border-top: none;
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  margin: 12px;
  font-size: 18px;
  font-weight: bold;

  a {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.foregroundNormal};

    svg {
      margin-right: 0.5em;
    }

    &.active {
      color: ${({ theme }) => theme.highlightNormal};
    }

    &:hover {
      text-decoration: none;
    }
  }
`;

const Disclaimer = styled.p`
  color: ${({ theme }) => theme.foregroundLight};
  font-size: 12px;
`;

interface SidebarProps {
  expanded: boolean;
}

export const Sidebar = (props: SidebarProps) => {
  const { expanded } = props;
  const { t } = useTranslation();

  if (!expanded) {
    return null;
  }

  return (
    <Wrapper>
      <nav>
        <List>
          <ListItem>
            <NavLink to="/activities" activeClassName="active">
              <Tv />
              {t('sidebar.activities', { defaultValue: 'Activities' })}
            </NavLink>
          </ListItem>

          <ListItem>
            <NavLink to="/performers" activeClassName="active">
              <User />
              {t('sidebar.performers', { defaultValue: 'Performers' })}
            </NavLink>
          </ListItem>

          <ListItem>
            <NavLink to="/teams" activeClassName="active">
              <Users />
              {t('sidebar.teams', { defaultValue: 'Teams' })}
            </NavLink>
          </ListItem>

          <ListItem>
            <NavLink to="/categories" activeClassName="active">
              <Hash />
              {t('sidebar.tags', { defaultValue: 'Tags' })}
            </NavLink>
          </ListItem>
        </List>
      </nav>

      <Disclaimer>
        <Trans i18nKey="sidebar.disclaimer">
          This website is unofficially made by a fan of Nijisanji and not
          related to Ichikara Inc. at all. The project is open source software.
          You can contribute or report issue on{' '}
          <a href="https://github.com/neet/refined-itsukara-link">GitHub</a>.
        </Trans>
      </Disclaimer>
    </Wrapper>
  );
};
