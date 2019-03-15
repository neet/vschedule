import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { Trans, useTranslation } from 'react-i18next';
import { styled } from 'client/ui/styles';
import { Event } from 'shared/entities/event';
import { EventCard } from 'client/ui/components/event-card';
import { EventCardPlaceholders } from './placeholder';

export interface SidebarProps {
  events: Event[];
}

const Wrapper = styled.aside`
  display: none;
  box-sizing: border-box;
  grid-area: 1 / 1;
  padding: 18px;
  overflow: scroll;
  background-color: ${({ theme }) => theme.backgroundDark};
  box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.16);
  -webkit-overflow-scrolling: touch;

  @media screen and (min-width: 700px) {
    display: block;
  }
`;

const Title = styled.h2`
  margin-bottom: 8px;
  font-size: 16px;

  & > strong {
    color: ${({ theme }) => theme.highlightNormal};
  }
`;

const List = styled.ul`
  display: block;
`;

const ListItem = styled.li`
  display: block;
`;

export const Sidebar = (props: SidebarProps) => {
  const { events } = props;
  const { t } = useTranslation();

  const unfinishedEvents = useMemo(
    () => events.filter(event => dayjs(event.end_date).isAfter(dayjs())),
    [events],
  );

  const streamingEvents = useMemo(
    () =>
      events.filter(
        event =>
          dayjs(event.start_date).isBefore(dayjs()) &&
          dayjs(event.end_date).isAfter(dayjs()),
      ),
    [events],
  );

  return (
    <Wrapper>
      <Title>
        {streamingEvents.length > 0 ? (
          <Trans i18nKey="sidebar.title" count={streamingEvents.length}>
            <strong>{{ count: streamingEvents.length }}</strong> streaming is on
            air
          </Trans>
        ) : (
          t('sidebar.no_streaming', {
            defaultValue: "There's no streaming on air",
          })
        )}
      </Title>

      <List>
        {unfinishedEvents.length ? (
          unfinishedEvents.map((event, i) => (
            <ListItem
              key={event.id}
              aria-setsize={events.length}
              aria-posinset={i + 1}
            >
              <EventCard event={event} />
            </ListItem>
          ))
        ) : (
          <EventCardPlaceholders />
        )}
      </List>
    </Wrapper>
  );
};
