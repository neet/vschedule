import * as G from 'src/generated/graphql';
import { serializeTeam } from 'src/serializers/team';

export const teams: G.PerformerResolvers['teams'] = async (
  parent,
  _,
  { repositories },
) => {
  const teams = await repositories.team
    .findByMembership(parent.id)
    .then(teams => teams.map(team => serializeTeam(team)));

  return teams;
};
