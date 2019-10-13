import {
  useFetchActivitiesQuery,
  ActivitiesInput,
  ActivityFragment,
} from 'src/generated/graphql';
import { useQueryParam, StringParam } from 'use-query-params';

export const useTimetable = () => {
  const [afterDate] = useQueryParam('after_date', StringParam);
  const [beforeDate] = useQueryParam('before_date', StringParam);
  const [categoryId] = useQueryParam('category_id', StringParam);
  const [teamId] = useQueryParam('team_id', StringParam);
  const [performerId] = useQueryParam('performer_id', StringParam);

  const input: ActivitiesInput = {
    last: 100,
    afterDate,
    beforeDate,
    categoryId,
    teamId,
    performerId,
  };

  const { data, loading, fetchMore } = useFetchActivitiesQuery({
    variables: { input },
  });

  const onLoadNext = () => {
    if (!data || !data.activities) return;

    const { activities } = data;

    return fetchMore({
      variables: {
        input: {
          after: activities.pageInfo.endCursor,
        },
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        const newEdges = fetchMoreResult.activities.edges;
        const pageInfo = fetchMoreResult.activities.pageInfo;

        return newEdges.length
          ? {
              activities: {
                __typename: previousResult.activities.__typename,
                edges: [...previousResult.activities.edges, ...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  };

  const onLoadPrevious = () => {
    if (!data || !data.activities) return;

    const { activities } = data;

    return fetchMore({
      variables: {
        input: {
          before: activities.pageInfo.startCursor,
        },
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        const newEdges = fetchMoreResult.activities.edges;
        const pageInfo = fetchMoreResult.activities.pageInfo;

        return newEdges.length
          ? {
              activities: {
                __typename: previousResult.activities.__typename,
                edges: [...newEdges, ...previousResult.activities.edges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  };

  return {
    activities:
      data &&
      data.activities.edges
        .map(edge => edge.node)
        .filter((v): v is ActivityFragment => !!v),
    loading,
    hasNextPage: data && data.activities.pageInfo.hasNextPage,
    hasPreviousPage: data && data.activities.pageInfo.hasPreviousPage,
    onLoadNext,
    onLoadPrevious,
  };
};
