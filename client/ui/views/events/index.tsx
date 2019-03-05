import * as React from 'react';
import { EventsTimelineContainer } from '../../containers/events-timeline-container';
import { SidebarContainer } from '../../containers/sidebar-container';
import { Page } from '../../components/page';

export const Events = React.memo(() => {
  return (
    <Page>
      <SidebarContainer />
      <EventsTimelineContainer eventListId="all" />
    </Page>
  );
});
