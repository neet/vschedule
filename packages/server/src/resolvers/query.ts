import * as G from 'src/generated/graphql';
import { Performer } from 'src/entity/performer';
import { createPageInfo } from 'src/utils/create-page-info';
import { Cursor } from 'src/utils/cursor';

export const Query: G.QueryResolvers = {
  node: async (_parent, { cursor }, { loader }) => {
    const { type, id } = Cursor.decode(cursor);

    switch (type) {
      case 'Performer':
        return await loader.performerLoader.load(id).then(performer => ({
          __typename: 'Performer',
          ...performer.toResponse(),
        }));
      default:
        throw new Error('Unexisted type');
    }
  },

  activity: async (_parent, { id }, { loader }) => {
    return loader.activityLoader
      .load(id)
      .then(activity => activity.toResponse());
  },

  performer: async (_parent, { id }, { loader }) => {
    return loader.performerLoader
      .load(id)
      .then(performer => performer.toResponse());
  },

  performers: async (_parent, args, { connection }) => {
    const { first, last, before, after } = args;
    const limit = (last ? last : first) || 100;
    const order = last ? 'DESC' : 'ASC';

    const query = connection
      .getRepository(Performer)
      .createQueryBuilder('performer')
      .leftJoinAndSelect('performer.twitterAccounts', 'twitterAccount')
      .leftJoinAndSelect('performer.youtubeAccounts', 'youtubeAccount')
      .leftJoinAndSelect('performer.teams', 'team')
      .orderBy('performer.id', order)
      .limit(Math.min(limit, 100));

    if (before) {
      const { id } = Cursor.decode(before);
      query.orWhere('performer.id < :id', { id });
    }

    if (after) {
      const { id } = Cursor.decode(after);
      query.orWhere('performer.id > :id', { id });
    }

    const [performers, count] = await query.getManyAndCount();

    const edges = performers.map(performer => ({
      cursor: Cursor.encode('Performer', performer.id),
      node: performer.toResponse(),
    }));

    const pageInfo = createPageInfo(edges, count, args);

    return {
      edges,
      nodes: edges.map(edge => edge.node),
      pageInfo,
    };
  },
};
