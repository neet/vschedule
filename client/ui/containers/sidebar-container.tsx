import { Sidebar } from '../components/sidebar';
import React, { useCallback } from 'react';
import { RootState } from '../redux/types';
import { eventSelector } from '../redux/selectors';
import { useMappedState } from 'redux-react-hook';

export const SidebarContainer = () => {
  const mapState = useCallback(
    (state: RootState) => ({
      events: state.eventLists.all.map(id => eventSelector(state, id)),
    }),
    [],
  );

  const { events } = useMappedState(mapState);

  return <Sidebar events={events} />;
};
