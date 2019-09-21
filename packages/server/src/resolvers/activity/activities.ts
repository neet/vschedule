import * as G from 'src/generated/graphql';
import { Cursor } from 'src/utils/cursor';
import { getCustomRepository } from 'typeorm';
import { createPageInfo } from 'src/utils/create-page-info';
import { ActivityRepository } from 'src/repository/activity';
import { serializeActivity } from 'src/serializers/activity';

export const activities: G.QueryResolvers['activities'] = async (
  _parent,
  args,
) => {
  // prettier-ignore
  const [activities, count] = await getCustomRepository(ActivityRepository)
    .getAllAndCount(args)

  const edges = activities.map(activity => ({
    cursor: Cursor.encode('Activity', activity.id),
    node: serializeActivity(activity),
  }));

  return {
    edges,
    nodes: edges.map(edge => edge.node),
    pageInfo: createPageInfo(edges, count, args),
  };
};
