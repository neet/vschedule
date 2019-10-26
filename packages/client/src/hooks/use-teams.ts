import { useFetchTeamsQuery } from 'src/generated/graphql';

export const useTeams = () => {
  const { data, loading, fetchMore } = useFetchTeamsQuery();

  const onLoadNext = () => {
    if (!data || !data.teams) return;

    return fetchMore({
      variables: {
        // Skip alredy taken nodes
        offset: data.teams.nodes.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          teams: {
            __typename: prev.teams.__typename,
            nodes: [...prev.teams.nodes, ...fetchMoreResult.teams.nodes],
            pageInfo: fetchMoreResult.teams.pageInfo,
          },
        };
      },
    });
  };

  return {
    teams: data && data.teams.nodes,
    loading,
    hasNextPage: data && data.teams.pageInfo.hasNextPage,
    onLoadNext,
  };
};
