import React from 'react';
import { Sidebar } from 'src/components/sidebar';
import { useFetchSidebarQuery } from 'src/generated/graphql';

export const SidebarContainer = () => {
  const { data } = useFetchSidebarQuery();

  if (data === undefined) {
    return null;
  }

  return <Sidebar expanded={data.isSidebarExpanded} />;
};
