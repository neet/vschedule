import * as G from 'src/generated/graphql';
import { getCustomRepository } from 'typeorm';
import { TeamRepository } from 'src/repository/team';
import { serializeTeam } from 'src/serializers/team';

export const teams: G.PerformerResolvers['teams'] = async parent => {
  const teams = await getCustomRepository(TeamRepository)
    .findByMembership(parent.id)
    .then(teams => teams.map(team => serializeTeam(team)));

  return teams;
};
