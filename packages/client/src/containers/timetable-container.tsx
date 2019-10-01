import React from 'react';
import { Timetable } from 'src/components/timetable';
import { useFetchActivitiesQuery } from 'src/generated/graphql';
import { useQueryParam, StringParam } from 'use-query-params';

export const TimetableContainer = () => {
  const [startSince] = useQueryParam('start_since', StringParam);
  const { data, loading } = useFetchActivitiesQuery({
    variables: { startSince },
  });

  return (
    <Timetable activities={data && data.activities.nodes} loading={loading} />
  );
};
