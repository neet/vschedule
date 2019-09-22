import * as G from 'src/generated/graphql';
import { serializePerformer } from 'src/serializers/performer';

export const rootPerformer: G.QueryResolvers['performer'] = async (
  _parent,
  { id },
  { repositories },
) => {
  const performer = await repositories.performer.find
    .load(id)
    .then(serializePerformer);

  return performer;
};
