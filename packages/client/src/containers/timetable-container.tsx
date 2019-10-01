import React from 'react';
import { Timetable } from 'src/components/timetable';
import { useFetchActivitiesQuery } from 'src/generated/graphql';
import { useQueryParam, StringParam } from 'use-query-params';

export const TimetableContainer = () => {
  const [startSince] = useQueryParam('start_since', StringParam);
  const [categoryId] = useQueryParam('category_id', StringParam);
  const [teamId] = useQueryParam('team_id', StringParam);
  const [performerId] = useQueryParam('performer_id', StringParam);

  const { data, loading } = useFetchActivitiesQuery({
    variables: { startSince, categoryId, teamId, performerId },
  });

  return (
    <Timetable activities={data && data.activities.nodes} loading={loading} />
  );
};
