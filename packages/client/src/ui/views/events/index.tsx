import * as React from 'react';
import { TimetableContainer } from 'client/ui/containers/timetable-container';
import { SidebarContainer } from 'client/ui/containers/sidebar-container';
import { Page } from 'client/ui/components/page';

export const Events = React.memo(() => {
  return (
    <Page>
      <SidebarContainer />
      <TimetableContainer />
    </Page>
  );
});
