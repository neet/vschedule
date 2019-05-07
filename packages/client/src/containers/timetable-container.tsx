import React from 'react';
import { Timetable } from 'src/components/timetable';
import { useFetchContentsQuery } from 'src/generated/graphql';
import { oc } from 'ts-optchain';

export const TimetableContainer = () => {
  const { data, loading } = useFetchContentsQuery();

  return <Timetable contents={oc(data).contents()} loading={loading} />;
};
