import React from 'react';
import { Timetable } from 'src/components/timetable';
import { FetchContentsComponent } from 'src/generated/graphql';

export const TimetableContainer = () => {
  return (
    <FetchContentsComponent>
      {result => {
        if (!result.data || !result.data.contents) return null;
        return <Timetable contents={result.data.contents} />;
      }}
    </FetchContentsComponent>
  );
};
