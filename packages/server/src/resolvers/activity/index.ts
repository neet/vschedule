import * as G from 'src/generated/graphql';
import { root } from './root';
import { activities } from './activities';

export const category: G.Resolvers = {
  Query: {
    activity: root,
    activities,
  },
};
