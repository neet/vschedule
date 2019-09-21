import * as G from 'src/generated/graphql';
import { getCustomRepository } from 'typeorm';
import { ActivityRepository } from 'src/repository/activity';
import { serializeActivity } from 'src/serializers/activity';

export const root: G.QueryResolvers['activity'] = async (_parent, { id }) => {
  // prettier-ignore
  const category = await getCustomRepository(ActivityRepository)
    .find.load(id)
    .then(activity => serializeActivity(activity));

  return category;
};
