import * as G from 'src/generated/graphql';
import { serializePerformer } from 'src/serializers/performer';

export const members: G.TeamResolvers['members'] = async (
  parent,
  _,
  { repositories },
) => {
  const teams = await repositories.performer
    .findByTeamId(parent.id)
    .then((teams) => teams.map((team) => serializePerformer(team)));

  return teams;
};
