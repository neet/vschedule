import * as G from 'src/generated/graphql';
import merge from 'deepmerge';
import { activity } from './activity';
import { category } from './category';
import { performer } from './performer';
import { team } from './team';
import { socialAccount } from './social-account';
import { node } from './node';
import { search } from './search';

export const resolvers: G.Resolvers = merge.all([
  activity,
  category,
  node,
  performer,
  socialAccount,
  team,
  search,
]);
