import * as G from 'src/generated/graphql';
import { resolveType } from './resolve-type';

export const socialAccount: G.QueryResolvers = {
  SocialAccount: {
    __resolveType: resolveType,
  },
};
