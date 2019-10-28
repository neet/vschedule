import { useFetchPerformersQuery } from 'src/generated/graphql';

export const usePerformers = () => {
  const { data, loading, fetchMore } = useFetchPerformersQuery();

  const onLoadNext = () => {
    if (!data || !data.performers) return;

    return fetchMore({
      variables: {
        offset: data.performers.nodes.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          performers: {
            __typename: prev.performers.__typename,
            nodes: [
              ...prev.performers.nodes,
              ...fetchMoreResult.performers.nodes,
            ],
            pageInfo: fetchMoreResult.performers.pageInfo,
          },
        };
      },
    });
  };

  return {
    performers: data && data.performers.nodes,
    loading,
    hasNextPage: data && data.performers.pageInfo.hasNextPage,
    onLoadNext,
  };
};
