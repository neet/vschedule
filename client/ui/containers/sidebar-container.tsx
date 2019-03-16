import React from 'react';
import { useEvents } from 'client/ui/hooks/use-events';
import { Sidebar } from 'client/ui/components/sidebar';

export const SidebarContainer = () => {
  const { events } = useEvents();
  return <Sidebar events={events} />;
};
