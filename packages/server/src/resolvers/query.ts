import * as G from 'src/generated/graphql';
import { Performer } from 'src/entity/performer';

export const Query: G.QueryResolvers = {
  activity: async (_parent, { id }, { loader }) => {
    return loader.activityLoader
      .load(id)
      .then(activity => activity.toResponse());
  },

  performers: async (_parent, { first }, { connection }) => {
    const performers = await connection
      .getRepository(Performer)
      .createQueryBuilder()
      .limit(first || 100)
      .getMany()
      .then(performers => performers.map(performer => performer.toResponse()));

    const edges = performers.map(performer => ({
      cursor: new Buffer(`performer-${performer.id}`).toString('base64'),
      node: performer,
    }));

    const pageInfo = {
      hasNextPage: true,
      hasPreviousPage: true,
      startCursor: '1',
      endCursor: '1',
    };

    return {
      edges,
      nodes: performers,
      pageInfo,
    };
  },
};
