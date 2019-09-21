import * as G from 'src/generated/graphql';
import { getCustomRepository } from 'typeorm';
import { TeamRepository } from 'src/repository/team';
import { serializeTeam } from 'src/serializers/team';

export const root: G.QueryResolvers['team'] = async (_parent, { id }) => {
  // prettier-ignore
  const team = await getCustomRepository(TeamRepository)
    .find.load(id)
    .then(serializeTeam);

  return team;
};
