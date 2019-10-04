import React from 'react';
import { Timetable } from 'src/components/timetable';
import {
  useFetchActivitiesQuery,
  ActivitiesInput,
} from 'src/generated/graphql';
import { useQueryParam, StringParam } from 'use-query-params';

export const TimetableContainer = () => {
  const [afterDate] = useQueryParam('after_date', StringParam);
  const [beforeDate] = useQueryParam('before_date', StringParam);
  const [categoryId] = useQueryParam('category_id', StringParam);
  const [teamId] = useQueryParam('team_id', StringParam);
  const [performerId] = useQueryParam('performer_id', StringParam);

  const input: ActivitiesInput = {
    last: 100,
    afterDate,
    beforeDate,
    categoryId,
    teamId,
    performerId,
  };

  const { data, loading } = useFetchActivitiesQuery({
    variables: { input },
  });

  return (
    <Timetable activities={data && data.activities.nodes} loading={loading} />
  );
};
