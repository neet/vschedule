import { useFetchCategoriesLazyQuery } from 'src/generated/graphql';

export const useSidebar = () => {
  const [fetchCategories, { data: categories }] = useFetchCategoriesLazyQuery();

  return {
    toggle: () => {},
    expanded: true,
    categories: categories && categories.categories.nodes,
    fetchCategories,
  };
};
