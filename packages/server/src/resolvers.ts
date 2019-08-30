import { Resolvers, Group, Streamer } from './generated/graphql';
import {
  groups as groupsDataset,
  getGroupsByMembership,
  matchGroupsFromStreamerIds,
  getGroupById,
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

    group: async (_, { id }) => {
      const group = groupsDataset.find(group => group.id === id);

      if (!group) {
        throw new Error('Not such group ID');
      }

      return {
        id: group.id,
        name: group.name,
        members: [],
      };
    },

    groups: async () => {
      const groups: Group[] = groupsDataset.map(group => ({
        id: group.id,
        name: group.name,
        members: [],
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

    groups: async parent => {
      const groupsDataset = getGroupsByMembership(parent.id);

      if (!groupsDataset) {
        return [];
      }

      const groups = groupsDataset.map(group => ({
        id: '',
        name: group.name,
        members: [],
      }));

      return groups;
    },
  },

  Content: {
    group: async parent => {
      const streamerIds = parent.streamers.map(streamer => streamer.id);
      const group = matchGroupsFromStreamerIds(streamerIds);

      if (!group) {
        return null;
      }

      return {
        id: group.id,
        name: group.name,
        members: [],
      };
    },
  },

  Group: {
    members: async (parent, _, { dataSources }) => {
      const streamers = await dataSources.itsukaraLink.fetchStreamers();

      return getGroupById(parent.id)
        .streamerIds.map(id => streamers.find(streamer => streamer.id === id))
        .filter((streamer): streamer is Streamer => !!streamer);
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
