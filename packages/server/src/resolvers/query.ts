import * as G from 'src/generated/graphql';
import { Performer } from 'src/entity/performer';
import { createPageInfo } from 'src/utils/create-page-info';
import { Cursor } from 'src/utils/cursor';
import { Activity } from 'src/entity/activity';
import { Category } from 'src/entity/category';
import { Team } from 'src/entity/team';

export const Query: G.QueryResolvers = {
  node: async (_parent, { cursor }, { loader }) => {
    const { typename, id } = Cursor.decode(cursor);

    switch (typename) {
      case 'Performer':
        return await loader.performerLoader.load(id).then(performer => ({
          __typename: 'Performer',
          ...performer.toResponse(),
        }));
      case 'Activity':
        return await loader.activityLoader.load(id).then(activity => ({
          __typename: 'Activity',
          ...activity.toResponse(),
        }));
      case 'Category':
        return await loader.categoryLoader.load(id).then(category => ({
          __typename: 'Category',
          ...category.toResponse(),
        }));
      case 'Team':
        return await loader.teamLoader.load(id).then(team => ({
          __typename: 'Team',
          ...team.toResponse(),
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

  activities: async (_parent, args, { connection }) => {
    const { first, last, before, after } = args;
    const limit = (last ? last : first) || 100;
    const order = last ? 'DESC' : 'ASC';

    const query = connection
      .getRepository(Activity)
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.performers', 'performer')
      .leftJoinAndSelect('activity.category', 'category')
      .orderBy('activity.id', order)
      .limit(Math.min(limit, 100));

    if (before) {
      const { id } = Cursor.decode(before);
      query.orWhere('activity.id < :id', { id });
    }

    if (after) {
      const { id } = Cursor.decode(after);
      query.orWhere('activity.id > :id', { id });
    }

    const [activities, count] = await query.getManyAndCount();

    const edges = activities.map(activity => ({
      cursor: Cursor.encode('Activity', activity.id),
      node: activity.toResponse(),
    }));

    const pageInfo = createPageInfo(edges, count, args);

    return {
      edges,
      nodes: edges.map(edge => edge.node),
      pageInfo,
    };
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

  category: async (_parent, { id }, { loader }) => {
    return await loader.categoryLoader
      .load(id)
      .then(category => category.toResponse());
  },

  categories: async (_parent, args, { connection }) => {
    const { first, last, before, after } = args;
    const limit = (last ? last : first) || 100;
    const order = last ? 'DESC' : 'ASC';

    const query = connection
      .getRepository(Category)
      .createQueryBuilder('category')
      .orderBy('category.id', order)
      .limit(Math.min(limit, 100));

    if (before) {
      const { id } = Cursor.decode(before);
      query.orWhere('category.id < :id', { id });
    }

    if (after) {
      const { id } = Cursor.decode(after);
      query.orWhere('category.id > :id', { id });
    }

    const [categories, count] = await query.getManyAndCount();

    const edges = categories.map(category => ({
      cursor: Cursor.encode('Category', category.id),
      node: category.toResponse(),
    }));

    const pageInfo = createPageInfo(edges, count, args);

    return {
      edges,
      nodes: edges.map(edge => edge.node),
      pageInfo,
    };
  },

  team: async (_parent, { id }, { loader }) => {
    return await loader.teamLoader.load(id).then(team => team.toResponse());
  },

  teams: async (_parent, args, { connection }) => {
    const { first, last, before, after } = args;
    const limit = (last ? last : first) || 100;
    const order = last ? 'DESC' : 'ASC';

    const query = connection
      .getRepository(Team)
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.members', 'performer')
      .orderBy('team.id', order)
      .limit(Math.min(limit, 100));

    if (before) {
      const { id } = Cursor.decode(before);
      query.orWhere('team.id < :id', { id });
    }

    if (after) {
      const { id } = Cursor.decode(after);
      query.orWhere('team.id > :id', { id });
    }

    const [teams, count] = await query.getManyAndCount();

    const edges = teams.map(team => ({
      cursor: Cursor.encode('Team', team.id),
      node: team.toResponse(),
    }));

    const pageInfo = createPageInfo(edges, count, args);

    return {
      edges,
      nodes: edges.map(edge => edge.node),
      pageInfo,
    };
  },
};
