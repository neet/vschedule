import {
  useFetchSidebarQuery,
  useFetchCategoriesQuery,
  useToggleSidebarMutation,
} from 'src/generated/graphql';

export const useSidebar = () => {
  const [toggle] = useToggleSidebarMutation();
  const { data: sideBar } = useFetchSidebarQuery();
  const { data: categories } = useFetchCategoriesQuery();

  return {
    toggle,
    expanded: sideBar && sideBar.isSidebarExpanded,
    categories: categories && categories.categories.nodes,
  };
};
