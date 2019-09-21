import * as G from 'src/generated/graphql';
import { getCustomRepository } from 'typeorm';
import { PerformerRepository } from 'src/repository/performer';
import { serializePerformer } from 'src/serializers/performer';

export const root: G.QueryResolvers['performer'] = async (_parent, { id }) => {
  // prettier-ignore
  const performer = await getCustomRepository(PerformerRepository)
    .find.load(id)
    .then(serializePerformer);

  return performer;
};
