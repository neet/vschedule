import * as G from 'src/generated/graphql';
import { serializeActivity } from 'src/serializers/activity';

export const rootActivity: G.QueryResolvers['activity'] = async (
  _parent,
  { id },
  { loaders },
) => {
  const category = await loaders.activity
    .load(id)
    .then((activity) => serializeActivity(activity));

  return category;
};
