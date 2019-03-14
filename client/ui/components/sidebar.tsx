import React, { useMemo } from 'react';
import { styled } from 'client/ui/styles';
import { Event } from 'shared/entities/event';
import { EventCard } from './event-card';
import { Trans } from 'react-i18next';
import dayjs from 'dayjs';

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

  @media screen and (min-width: 700px) {
    display: block;
  }
`;

const Title = styled.h2`
  margin-bottom: 8px;
  font-size: 16px;

  & > strong {
    color: ${({ theme }) => theme.highlightNormal};
    font-size: 21px;
  }
`;

export const Sidebar = (props: SidebarProps) => {
  const { events } = props;

  const upcomingEvents = useMemo(
    () =>
      events.filter(
        event => dayjs(event.end_date).valueOf() > dayjs().valueOf(),
      ),
    [event],
  );

  const streamingEvents = useMemo(
    () =>
      events.filter(
        event =>
          dayjs(event.start_date).valueOf() <= dayjs().valueOf() &&
          dayjs(event.end_date).valueOf() > dayjs().valueOf(),
      ),
    [event],
  );

  return (
    <Wrapper>
      <Title>
        <Trans i18nKey="sidebar.title" count={streamingEvents.length}>
          <strong>{{ count: streamingEvents.length }}</strong> streamings now on
          air
        </Trans>
      </Title>

      {upcomingEvents.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </Wrapper>
  );
};
