import { useCallback, useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { fetchEvents } from 'client/ui/redux/actions/events';
import { eventSelector } from 'client/ui/redux/selectors';
import { RootState } from 'client/ui/redux/types';

export function useEvents() {
  const mapState = useCallback(
    (state: RootState) => ({
      events: state.eventLists.all.map(id => eventSelector(state, id)),
    }),
    [],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return useMappedState(mapState);
}
