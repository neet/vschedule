import React, { useCallback } from 'react';
import { Timetable } from 'client/ui/components/timetable';
import { RootState } from 'client/ui/redux/types';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { fetchEvents } from 'client/ui/redux/actions/events';
import { eventSelector } from 'client/ui/redux/selectors';

export interface TimetableContainerProps {
  eventListId: 'all';
}

export const TimetableContainer = (props: TimetableContainerProps) => {
  const { eventListId } = props;

  const mapState = useCallback(
    (state: RootState) => ({
      events: state.eventLists[eventListId].map(id => eventSelector(state, id)),
    }),
    [eventListId],
  );

  const { events } = useMappedState(mapState);
  const dispatch = useDispatch();

  const onFetchEvents = useCallback(() => {
    dispatch(fetchEvents());
  }, [events]);

  return <Timetable events={events} onFetchEvents={onFetchEvents} />;
};
