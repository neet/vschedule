import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { Tv, User, Users, Hash, ChevronDown, ChevronUp } from 'react-feather';
import logoSmall from '@ril/arts/static/logo-small.png';
import { styled } from 'src/styles';
import { useSidebar } from 'src/hooks/use-sidebar';
import { Category } from 'src/components/category';

interface WrapperProps {
  show: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  box-sizing: border-box;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: space-between;
  width: 230px;
  height: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.borderNormal};
  border-top: none;
  background-color: ${({ theme }) => theme.backgroundNormal};

  @media screen and (min-width: 700px) {
    position: static;
  }
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
  font-size: 16px;
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

const CategoryList = styled.ul`
  margin: 0 12px;
`;

const CategoryListItem = styled.li`
  margin-left: 12px;
  padding: 6px 0px;
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

const Background = styled.div`
  position: absolute;
  z-index: 9998;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  @media screen and (min-width: 700px) {
    display: none;
  }
`;

export const Sidebar = () => {
  const { toggle, expanded, categories, fetchCategories } = useSidebar();
  const { t } = useTranslation();
  const [categoriesExpanded, expandCategories] = useState(false);

  const handleToggleCategories = () => {
    if (!categories) fetchCategories();
    expandCategories(!categoriesExpanded);
  };

  return (
    <>
      {expanded && <Background onClick={() => toggle()} />}

      <Wrapper show={expanded}>
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
              <button onClick={handleToggleCategories}>
                <Icon>
                  <Hash />
                </Icon>

                <Name>{t('sidebar.tags', { defaultValue: 'Tags' })}</Name>

                <Chevron>
                  {categoriesExpanded ? <ChevronUp /> : <ChevronDown />}
                </Chevron>
              </button>
            </ListItem>

            {categoriesExpanded && categories ? (
              <CategoryList>
                {categories.map(category => (
                  <CategoryListItem key={category.id}>
                    <Category category={category} withCount />
                  </CategoryListItem>
                ))}
              </CategoryList>
            ) : null}
          </List>
        </nav>

        <Disclaimer>
          <Trans i18nKey="sidebar.disclaimer">
            This website is unofficially made by a fan of Nijisanji and not
            related to Ichikara Inc. at all. The project is open source
            software. You can contribute or report issue on{' '}
            <a href="https://github.com/neet/refined-itsukara-link">GitHub</a>.
          </Trans>
        </Disclaimer>
      </Wrapper>
    </>
  );
};
