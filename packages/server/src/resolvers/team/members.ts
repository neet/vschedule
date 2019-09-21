import * as G from 'src/generated/graphql';
import { getCustomRepository } from 'typeorm';
import { PerformerRepository } from 'src/repository/performer';
import { serializePerformer } from 'src/serializers/performer';

export const members: G.TeamResolvers['members'] = async parent => {
  const teams = await getCustomRepository(PerformerRepository)
    .findByTeamId(parent.id)
    .then(teams => teams.map(team => serializePerformer(team)));

  return teams;
};
