import { Performer } from 'src/entity/performer';
import * as G from 'src/generated/graphql';
import { serializeTeam } from './team';
import { Serialized } from './serializers';

export const serializePerformer = (
  entity: Performer,
): Serialized<G.Performer, 'socialAccounts' | 'activities' | 'teams'> => {
  return {
    ...entity,
    socialAccounts: [
      ...(entity.youtubeAccounts ? entity.youtubeAccounts : []),
      ...(entity.twitterAccounts ? entity.twitterAccounts : []),
    ],
    teams: entity.teams ? entity.teams.map(team => serializeTeam(team)) : [],
    activities: undefined,
  };
};
