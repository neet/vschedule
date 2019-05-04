import React from 'react';
import { Sidebar } from 'src/components/sidebar';
import { FetchContentsComponent } from 'src/generated/graphql';

export const SidebarContainer = () => {
  return (
    <FetchContentsComponent>
      {result => {
        if (!result.data || !result.data.contents) return null;
        return <Sidebar contents={result.data.contents} />;
      }}
    </FetchContentsComponent>
  );
};
