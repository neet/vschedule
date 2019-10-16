import * as G from 'src/generated/graphql';
import { Cursor } from 'src/utils/cursor';
import { serializeActivity } from 'src/serializers/activity';
import { createPageInfo } from 'src/utils/create-page-info';

export const activities: G.CategoryResolvers['activities'] = async (
  parent,
  { input },
  { repositories },
) => {
  const [activities, count] = await repositories.activity.getAllAndCount({
    ...input,
    categoryId: parent.id,
  });

  const edges = activities.map(activity => ({
    cursor: Cursor.encode('Activity', activity.id),
    node: serializeActivity(activity),
  }));

  return {
    edges,
    nodes: edges.map(edge => edge.node),
    pageInfo: createPageInfo(
      edges,
      count,
      input,
      ['before', 'beforeDate'],
      ['after', 'afterDate'],
    ),
  };
};
