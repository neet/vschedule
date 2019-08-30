import { Resolvers, Streamer, Group } from './generated/graphql';
import {
  groups as groupsDataset,
  getGroupsByMembership,
  matchGroupsFromStreamerIds,
} from './utils/groups';

export const resolvers: Resolvers = {
  Query: {
    content: (_, { id }, { dataSources }) =>
      dataSources.itsukaraLink.fetchContent(id),

    contents: (_1, _2, { dataSources }) =>
      dataSources.itsukaraLink.fetchContents(),

    streamer: (_, { id }, { dataSources }) =>
      dataSources.itsukaraLink.fetchStreamer(id),

    streamers: (_1, _2, { dataSources }) =>
      dataSources.itsukaraLink.fetchStreamers(),

    categories: (_1, _2, { dataSources }) =>
      dataSources.itsukaraLink.fetchCategories(),

    category: (_, { id }, { dataSources }) =>
      dataSources.itsukaraLink.fetchCategory(id),

    group: async (_, { id }, { dataSources }) => {
      const group = groupsDataset.find(group => group.id === id);

      if (!group) {
        throw new Error('Not such group ID');
      }

      const members = await Promise.all(
        group.streamerIds.map(id => dataSources.itsukaraLink.fetchStreamer(id)),
      );

      return {
        id: group.id,
        name: group.name,
        members,
      };
    },

    groups: async (_1, _2, { dataSources }) => {
      const streamers = await dataSources.itsukaraLink.fetchStreamers();

      const groups: Group[] = groupsDataset.map(group => ({
        id: group.id,
        name: group.name,
        members: group.streamerIds
          .map(id => streamers.find(streamer => streamer.id === id))
          .filter((streamer): streamer is Streamer => !!streamer),
      }));

      return groups;
    },
  },

  Streamer: {
    latinName: async (parent, _, { dataSources }) => {
      const data = await dataSources.itsukaraLink.fetchStreamer(parent.id);

      return data.latinName;
    },

    ruby: async (parent, _, { dataSources }) => {
      const data = await dataSources.itsukaraLink.fetchStreamer(parent.id);

      return data.ruby;
    },

    description: async (parent, _, { dataSources }) => {
      const data = await dataSources.itsukaraLink.fetchStreamer(parent.id);

      return data.description;
    },

    public: async (parent, _, { dataSources }) => {
      const data = await dataSources.itsukaraLink.fetchStreamer(parent.id);

      return data.public;
    },

    position: async (parent, _, { dataSources }) => {
      const data = await dataSources.itsukaraLink.fetchStreamer(parent.id);

      return data.position;
    },

    socialAccounts: async (parent, _, { dataSources }) => {
      const data = await dataSources.itsukaraLink.fetchStreamer(parent.id);

      return data.socialAccounts;
    },

    groups: async (parent, _, { dataSources }) => {
      const groupsDataset = getGroupsByMembership(parent.id);

      if (!groupsDataset) {
        return [];
      }

      const streamers = await dataSources.itsukaraLink.fetchStreamers();

      const groups = groupsDataset.map(group => ({
        id: '',
        name: group.name,
        members: group.streamerIds
          .map(streamerId =>
            streamers.find(streamer => streamer.id === streamerId),
          )
          .filter((streamer): streamer is Streamer => !!streamer),
      }));

      return groups;
    },
  },

  Content: {
    group: async (parent, _, { dataSources }) => {
      const group = matchGroupsFromStreamerIds(
        parent.streamers.map(streamer => streamer.id),
      );

      if (!group) {
        return null;
      }

      const members = await Promise.all(
        group.streamerIds.map(id => dataSources.itsukaraLink.fetchStreamer(id)),
      );

      return {
        id: group.id,
        name: group.name,
        members,
      };
    },
  },

  SocialAccount: {
    __resolveType: socialAccount => {
      if ('channel' in socialAccount) {
        return 'YoutubeChannel';
      }

      return 'TwitterAccount';
    },
  },
};
