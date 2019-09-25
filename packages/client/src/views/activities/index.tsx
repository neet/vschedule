import React from 'react';
import { Page } from 'src/components/page';
import { TimetableContainer } from 'src/containers/timetable-container';
import { Banner } from 'src/components/banner';

export const Activities = React.memo(() => {
  return (
    <Page>
      <Banner />
      <TimetableContainer />
    </Page>
  );
});
