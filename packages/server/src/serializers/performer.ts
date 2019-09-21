import { Performer } from 'src/entity/performer';
import * as G from 'src/generated/graphql';
import { serializeTeam } from './team';

export const serializePerformer = (entity: Performer): G.Performer => {
  return {
    ...entity,
    socialAccounts: [],
    teams: entity.teams ? entity.teams.map(team => serializeTeam(team)) : [],
  };
};
