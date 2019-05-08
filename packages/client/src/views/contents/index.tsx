import React from 'react';
import { Page } from 'src/components/page';
import { SidebarContainer } from 'src/containers/sidebar-container';
import { TimetableContainer } from 'src/containers/timetable-container';

export const Contents = React.memo(() => {
  return (
    <Page>
      <SidebarContainer />
      <TimetableContainer />
    </Page>
  );
});
