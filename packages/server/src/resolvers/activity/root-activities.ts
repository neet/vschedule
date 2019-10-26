import * as G from 'src/generated/graphql';
import { createPageInfo } from 'src/utils/create-page-info';
import { serializeActivity } from 'src/serializers/activity';

export const rootActivities: G.QueryResolvers['activities'] = async (
  _parent,
  { input },
  { repositories },
) => {
  const [activities, count] = await repositories.activity.getAllAndCount(input);
  const nodes = activities.map(activity => serializeActivity(activity));

  return {
    nodes,
    pageInfo: createPageInfo(nodes, count, input),
  };
};
