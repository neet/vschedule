import * as G from 'src/generated/graphql';
import { serializePerformer } from 'src/serializers/performer';

export const rootPerformer: G.QueryResolvers['performer'] = async (
  _parent,
  { id },
  { loaders },
) => {
  const performer = await loaders.performer.load(id).then(serializePerformer);

  return performer;
};
