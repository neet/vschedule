import React from 'react';
import { Timetable } from 'src/components/timetable';
import {
  useFetchActivitiesQuery,
  ActivityFragment,
} from 'src/generated/graphql';

export const TimetableContainer = () => {
  const { data, loading } = useFetchActivitiesQuery();

  return (
    <Timetable
      activities={
        data
          ? data.activities.nodes.filter((n): n is ActivityFragment => !!n)
          : undefined
      }
      loading={loading}
    />
  );
};
