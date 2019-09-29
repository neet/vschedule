import React from 'react';
import { Sidebar } from 'src/components/sidebar';
import {
  useFetchSidebarQuery,
  useFetchCategoriesQuery,
} from 'src/generated/graphql';

export const SidebarContainer = () => {
  const { data: sideBar } = useFetchSidebarQuery();
  const { data: categories } = useFetchCategoriesQuery();

  return (
    <Sidebar
      expanded={sideBar && sideBar.isSidebarExpanded}
      categories={categories && categories.categories.nodes}
    />
  );
};
