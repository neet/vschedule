import {
  useFetchSidebarQuery,
  useFetchCategoriesLazyQuery,
  useToggleSidebarMutation,
} from 'src/generated/graphql';

export const useSidebar = () => {
  const [toggle] = useToggleSidebarMutation();
  const { data: sideBar } = useFetchSidebarQuery();
  const [fetchCategories, { data: categories }] = useFetchCategoriesLazyQuery();

  return {
    toggle,
    expanded: sideBar && sideBar.isSidebarExpanded,
    categories: categories && categories.categories.nodes,
    fetchCategories,
  };
};
