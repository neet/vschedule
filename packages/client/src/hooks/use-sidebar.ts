import { useContext } from 'react';
import { LocalStateContext } from 'src/context';
import { useFetchCategoriesLazyQuery } from 'src/generated/graphql';

export const useSidebar = () => {
  const { showSidebar, setShowSidebar } = useContext(LocalStateContext);
  const [fetchCategories, { data: categories }] = useFetchCategoriesLazyQuery();

  return {
    toggle: () => {
      setShowSidebar(!showSidebar);
    },
    expanded: showSidebar,
    categories: categories && categories.categories.nodes,
    fetchCategories,
  };
};
