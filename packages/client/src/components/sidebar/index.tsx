// import dayjs from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
// import { ContentCard } from 'src/components/content-card';
import { styled } from 'src/styles';
import { sidebarWidth } from 'src/styles/constants';
// import { EventCardPlaceholders } from './placeholder';
import { NavLink } from 'react-router-dom';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: ${sidebarWidth}px;
  height: 100%;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.borderNormal};
  border-top: none;
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  margin: 6px;
  font-size: 18px;
  font-weight: bold;

  a {
    color: ${({ theme }) => theme.foregroundNormal};

    &.active {
      color: ${({ theme }) => theme.highlightNormal};
    }

    &:hover {
      text-decoration: none;
    }
  }
`;

export const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <List>
        <ListItem>
          <NavLink to="/timetable" activeClassName="active">
            {t('sidebar.timetable', { defaultValue: 'Timetable' })}
          </NavLink>
        </ListItem>

        <ListItem>
          <NavLink to="/streamers" activeClassName="active">
            {t('sidebar.streamers', { defaultValue: 'Streamers' })}
          </NavLink>
        </ListItem>

        <ListItem>
          <NavLink to="/tags" activeClassName="active">
            {t('sidebar.tags', { defaultValue: 'Tags' })}
          </NavLink>
        </ListItem>
      </List>
    </Wrapper>
  );
};
