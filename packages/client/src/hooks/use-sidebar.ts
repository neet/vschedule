import {
  useFetchSidebarQuery,
  useFetchCategoriesQuery,
} from 'src/generated/graphql';

export const useSidebar = () => {
  const { data: sideBar } = useFetchSidebarQuery();
  const { data: categories } = useFetchCategoriesQuery();

  return {
    expanded: sideBar && sideBar.isSidebarExpanded,
    categories: categories && categories.categories.nodes,
  };
};
