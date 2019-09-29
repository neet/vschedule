import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { styled } from 'src/styles';
import logoSmall from 'src/assets/logo-small.png';
import { Tv, User, Users, Hash, ChevronDown, ChevronUp } from 'react-feather';
import { CategoryFragment } from 'src/generated/graphql';

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

  a {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.foregroundNormal};

    &.active {
      color: ${({ theme }) => theme.highlightNormal};
    }

    &:hover {
      text-decoration: none;
    }
  }

  button {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.foregroundNormal};
  }
`;

const Icon = styled.span`
  display: flex;
  place-items: center;
  margin-right: 0.5em;
`;

const Name = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const Chevron = styled.span`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  place-items: center;
  color: ${({ theme }) => theme.foregroundLight};
`;

const Categories = styled.ul`
  margin: 12px 8px;
`;

const Category = styled.li`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.foregroundLight};
`;

const Title = styled.h1`
  display: none;
`;

const LogoLarge = styled.img`
  display: block;
  width: 30px;
  margin: 4px 0;
`;

const Disclaimer = styled.p`
  color: ${({ theme }) => theme.foregroundLight};
  font-size: 12px;
`;

interface SidebarProps {
  expanded?: boolean;
  categories?: CategoryFragment[];
}

export const Sidebar = (props: SidebarProps) => {
  const { expanded, categories } = props;
  const { t } = useTranslation();
  const [categoriesExpanded, expandCategories] = useState(false);

  if (!expanded) {
    return null;
  }

  return (
    <Wrapper>
      <nav>
        <List>
          <ListItem>
            <Link to="/">
              <Title>Refined itsukara.link</Title>
              <LogoLarge src={logoSmall} alt="Refined itsukara.link" />
            </Link>
          </ListItem>

          <ListItem>
            <NavLink to="/activities" activeClassName="active">
              <Icon>
                <Tv />
              </Icon>
              <Name>
                {t('sidebar.activities', { defaultValue: 'Activities' })}
              </Name>
            </NavLink>
          </ListItem>

          <ListItem>
            <NavLink to="/performers" activeClassName="active">
              <Icon>
                <User />
              </Icon>
              <Name>
                {t('sidebar.performers', { defaultValue: 'Performers' })}
              </Name>
            </NavLink>
          </ListItem>

          <ListItem>
            <NavLink to="/teams" activeClassName="active">
              <Icon>
                <Users />
              </Icon>
              <Name>{t('sidebar.teams', { defaultValue: 'Teams' })}</Name>
            </NavLink>
          </ListItem>

          <ListItem>
            <button onClick={() => expandCategories(!categoriesExpanded)}>
              <Icon>
                <Hash />
              </Icon>

              <Name>{t('sidebar.tags', { defaultValue: 'Tags' })}</Name>

              <Chevron>
                {categoriesExpanded ? <ChevronUp /> : <ChevronDown />}
              </Chevron>
            </button>

            {categoriesExpanded && categories ? (
              <Categories>
                {categories.map(category => (
                  <Category key={category.id}>{`#${category.name}`}</Category>
                ))}
              </Categories>
            ) : null}
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
