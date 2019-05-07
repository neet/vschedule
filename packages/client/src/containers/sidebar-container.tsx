import * as React from 'react';
import { Sidebar } from 'src/components/sidebar';
import { useFetchContentsQuery } from 'src/generated/graphql';
import { oc } from 'ts-optchain';

export const SidebarContainer = () => {
  const { data, loading } = useFetchContentsQuery();

  return <Sidebar contents={oc(data).contents()} loading={loading} />;
};
