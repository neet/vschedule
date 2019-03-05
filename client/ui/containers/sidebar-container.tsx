import { Sidebar } from '../components/sidebar';
import React, { useCallback } from 'react';
import { RootState } from '../redux/types';
import { eventSelector } from '../redux/selectors';
import { useMappedState } from 'redux-react-hook';
import dayjs from 'dayjs';

export const SidebarContainer = () => {
  const mapState = useCallback(
    (state: RootState) => ({
      events: state.eventLists.all
        .map(id => eventSelector(state, id))
        .filter(
          event =>
            dayjs(event.start_date).valueOf() <= dayjs().valueOf() &&
            dayjs(event.end_date).valueOf() > dayjs().valueOf(),
        ),
    }),
    [],
  );

  const { events } = useMappedState(mapState);

  return <Sidebar events={events} />;
};
