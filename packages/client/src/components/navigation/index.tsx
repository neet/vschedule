import React from 'react';
import { NavLink as DefaultNavLink } from 'react-router-dom';
import { TFunction } from 'i18next';
import { Tv, User, Users } from 'react-feather';
import { styled } from 'src/styles';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.nav``;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: 700px) {
    flex-direction: row;
    align-items: normal;
  }
`;

const ListItem = styled.li`
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  @media screen and (min-width: 700px) {
    width: auto;

    &:not(:last-child) {
      margin-right: 18px;
      margin-bottom: 0;
    }
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

  @media screen and (min-width: 700px) {
    font-size: 14px;
  }
`;

const Border = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  margin-bottom: -14px;
  background-color: ${({ theme }) => theme.highlightNormal};
`;

const NavLink = styled(DefaultNavLink)`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.foregroundNormal};

  @media screen and (min-width: 700px) {
    justify-content: center;
    min-width: 70px;
  }

  ${Border} {
    display: none;
  }

  &:hover {
    color: ${({ theme }) => theme.foregroundLight};
    text-decoration: none;
  }

  &.active {
    color: ${({ theme }) => theme.highlightNormal};

    ${Border} {
      @media screen and (min-width: 700px) {
        display: block;
      }
    }
  }
`;

const makeData = (t: TFunction) => [
  {
    to: '/activities',
    i18n: t('sidebar.activities', { defaultValue: 'Activities' }),
    icon: <Tv size={18} />,
  },
  {
    to: '/performers',
    i18n: t('sidebar.performers', { defaultValue: 'Streamers' }),
    icon: <User size={18} />,
  },
  {
    to: '/teams',
    i18n: t('sidebar.teams', { defaultValue: 'Collaborations' }),
    icon: <Users size={18} />,
  },
];

export const Navigation = () => {
  const { t } = useTranslation();
  const data = makeData(t);

  return (
    <Wrapper>
      <List>
        {data.map((item, i) => (
          <ListItem key={`${item.to}-${i}`}>
            <NavLink to={item.to} activeClassName="active">
              <Icon>{item.icon}</Icon>
              <Name>{item.i18n}</Name>
              <Border />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Wrapper>
  );
};
