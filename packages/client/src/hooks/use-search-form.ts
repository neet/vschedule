import { useSearchLazyQuery } from 'src/generated/graphql';

export const useSearchForm = () => {
  const [search, { data, loading }] = useSearchLazyQuery();

  return { search, loading, result: data && data.search };
};
