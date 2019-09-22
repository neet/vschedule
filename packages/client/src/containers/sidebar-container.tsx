import React from 'react';
import { Sidebar } from 'src/components/sidebar';
import {
  useFetchActivitiesQuery,
  ActivityFragment,
} from 'src/generated/graphql';

export const SidebarContainer = () => {
  const { data, loading } = useFetchActivitiesQuery();

  return (
    <Sidebar
      activities={
        data
          ? data.activities.nodes.filter((n): n is ActivityFragment => !!n)
          : undefined
      }
      loading={loading}
    />
  );
};
