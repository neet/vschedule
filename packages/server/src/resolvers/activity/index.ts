import * as G from 'src/generated/graphql';
import { rootActivity } from './root-activity';
import { rootActivities } from './root-activities';

export const activity: G.Resolvers = {
  Query: {
    activity: rootActivity,
    activities: rootActivities,
  },
};
