import React from 'react';
import { Timetable } from 'client/ui/components/timetable';
import { useEvents } from 'client/ui/hooks/use-events';

export const TimetableContainer = () => {
  const { events } = useEvents();
  return <Timetable events={events} />;
};
