import * as G from 'src/generated/graphql';
import { getCustomRepository } from 'typeorm';
import { CategoryRepostiory } from 'src/repository/category';

export const root: G.QueryResolvers['category'] = async (_parent, { id }) => {
  // prettier-ignore
  const category = await getCustomRepository(CategoryRepostiory)
    .find.load(id)

  return category;
};
