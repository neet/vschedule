import { Sidebar } from 'client/ui/components/sidebar';
import React, { useCallback } from 'react';
import { RootState } from 'client/ui/redux/types';
import { eventSelector } from 'client/ui/redux/selectors';
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
