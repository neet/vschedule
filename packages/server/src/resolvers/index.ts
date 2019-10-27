import * as G from 'src/generated/graphql';
import merge from 'deepmerge';
import { activity } from './activity';
import { category } from './category';
import { date } from './date';
import { performer } from './performer';
import { search } from './search';
import { socialAccount } from './social-account';
import { team } from './team';

export const resolvers: G.Resolvers = merge.all([
  activity,
  category,
  date,
  performer,
  search,
  socialAccount,
  team,
]);
