import * as React from 'react';
import { TimetableContainer } from 'src/containers/timetable-container';
import { SidebarContainer } from 'src/containers/sidebar-container';
import { Page } from 'src/components/page';

export const Events = React.memo(() => {
  return (
    <Page>
      <SidebarContainer />
      <TimetableContainer />
    </Page>
  );
});
