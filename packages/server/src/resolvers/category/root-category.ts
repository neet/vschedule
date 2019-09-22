import * as G from 'src/generated/graphql';

export const rootCategory: G.QueryResolvers['category'] = async (
  _parent,
  { id },
  { repositories },
) => {
  const category = await repositories.category.find.load(id);

  return category;
};
