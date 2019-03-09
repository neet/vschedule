import * as React from 'react';
import { EventsTimelineContainer } from 'client/ui/containers/events-timeline-container';
import { SidebarContainer } from 'client/ui/containers/sidebar-container';
import { Page } from 'client/ui/components/page';

export const Events = React.memo(() => {
  return (
    <Page>
      <SidebarContainer />
      <EventsTimelineContainer eventListId="all" />
    </Page>
  );
});
