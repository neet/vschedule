import { useFetchTeamsQuery } from 'src/generated/graphql';

export const useTeams = () => {
  const { data, loading, fetchMore } = useFetchTeamsQuery();

  const onLoadNext = () => {
    if (!data || !data.teams) return;

    const { teams } = data;

    return fetchMore({
      variables: {
        input: {
          after: teams.pageInfo.endCursor,
        },
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        const newEdges = fetchMoreResult.teams.edges;
        const pageInfo = fetchMoreResult.teams.pageInfo;

        return newEdges.length
          ? {
              teams: {
                __typename: previousResult.teams.__typename,
                edges: [...previousResult.teams.edges, ...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  };

  return {
    teams: data && data.teams.edges.map(({ node }) => node),
    loading,
    hasNextPage: data && data.teams.pageInfo.hasNextPage,
    onLoadNext,
  };
};
