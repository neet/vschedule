import * as G from 'src/generated/graphql';
import { rootNode } from './root-node';
import { resolveType } from './resolve-type';

export const node: G.Resolvers = {
  Query: {
    node: rootNode,
  },
  Node: {
    __resolveType: resolveType,
  },
};
