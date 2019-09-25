import * as G from 'src/generated/graphql';
import { rootSearch } from './root-search';

export const search: G.QueryResolvers = {
  Query: {
    search: rootSearch,
  },
};
