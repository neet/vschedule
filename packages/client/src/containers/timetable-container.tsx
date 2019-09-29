import React from 'react';
import { Timetable } from 'src/components/timetable';
import { useFetchActivitiesQuery } from 'src/generated/graphql';

export const TimetableContainer = () => {
  const { data, loading } = useFetchActivitiesQuery();

  return (
    <Timetable activities={data && data.activities.nodes} loading={loading} />
  );
};
