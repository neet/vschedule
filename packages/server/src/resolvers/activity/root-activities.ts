import * as G from 'src/generated/graphql';
import { Cursor } from 'src/utils/cursor';
import { createPageInfo } from 'src/utils/create-page-info';
import { serializeActivity } from 'src/serializers/activity';

export const rootActivities: G.QueryResolvers['activities'] = async (
  _parent,
  { input },
  { repositories },
) => {
  const [activities, count] = await repositories.activity.getAllAndCount(input);

  const edges = activities.map(activity => ({
    cursor: Cursor.encode('Activity', activity.id),
    node: serializeActivity(activity),
  }));

  return {
    edges,
    nodes: edges.map(edge => edge.node),
    pageInfo: createPageInfo(edges, count, input),
  };
};
