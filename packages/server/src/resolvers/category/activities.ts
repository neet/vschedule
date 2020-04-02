import * as G from 'src/generated/graphql';
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
  const nodes = activities.map((activity) => serializeActivity(activity));

  return {
    nodes,
    pageInfo: createPageInfo(nodes, count, input),
  };
};
