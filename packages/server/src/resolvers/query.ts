import * as G from 'src/generated/graphql';

export const Query: G.QueryResolvers = {
  activity: async (_parent, { id }, { loader }) => {
    return loader.activityLoader
      .load(id)
      .then(activity => activity.toResponse());
  },
};
