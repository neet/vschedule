import * as G from 'src/generated/graphql';
import { Cursor } from 'src/utils/cursor';
import { getCustomRepository } from 'typeorm';
import { createPageInfo } from 'src/utils/create-page-info';
import { CategoryRepostiory } from 'src/repository/category';

export const categories: G.QueryResolvers['categories'] = async (
  _parent,
  args,
) => {
  // prettier-ignore
  const [categories, count] = await getCustomRepository(CategoryRepostiory)
    .getAllAndCount(args)

  const edges = categories.map(category => ({
    cursor: Cursor.encode('Category', category.id),
    node: category,
  }));

  return {
    edges,
    nodes: edges.map(edge => edge.node),
    pageInfo: createPageInfo(edges, count, args),
  };
};
