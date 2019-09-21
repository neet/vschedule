import * as G from 'src/generated/graphql';
import { root } from './root';
import { activities } from './activities';

export const activity: G.Resolvers = {
  Query: {
    activity: root,
    activities,
  },
};
