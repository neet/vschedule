import * as G from 'src/generated/graphql';
import { Team } from 'src/entity/team';
import { serializePerformer } from './performer';

export const serializeTeam = (entity: Team): G.Team => {
  return {
    ...entity,
    members: entity.members
      ? entity.members.map(member => serializePerformer(member))
      : [],
  };
};
