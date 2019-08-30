import { Resolvers, Source, Group } from './generated/graphql';
import { groups as groupsDataset, getGroupsByMembership } from './utils/groups';

export const resolvers: Resolvers = {
  Query: {
    content: (_, { id }, { dataSources }) =>
      dataSources.itsukaraLink.fetchContent(id),

    contents: (_1, _2, { dataSources }) =>
      dataSources.itsukaraLink.fetchContents(),

    source: (_, { id }, { dataSources }) =>
      dataSources.itsukaraLink.fetchSource(id),

    sources: (_1, _2, { dataSources }) =>
      dataSources.itsukaraLink.fetchSources(),

    genres: (_1, _2, { dataSources }) => dataSources.itsukaraLink.fetchGenres(),

    genre: (_, { id }, { dataSources }) =>
      dataSources.itsukaraLink.fetchGenre(id),

    group: async (_, { id }, { dataSources }) => {
      const group = groupsDataset.find(group => group.id === id);

      if (!group) {
        throw new Error('Not such group ID');
      }

      const members = await Promise.all(
        group.sourceIds.map(id => dataSources.itsukaraLink.fetchSource(id)),
      );

      return {
        id: group.id,
        name: group.name,
        sources: members,
      };
    },

    groups: async (_1, _2, { dataSources }) => {
      const sources = await dataSources.itsukaraLink.fetchSources();

      const groups: Group[] = groupsDataset.map(group => ({
        id: group.id,
        name: group.name,
        sources: group.sourceIds
          .map(id => sources.find(source => source.id === id))
          .filter((source): source is Source => !!source),
      }));

      return groups;
    },
  },

  Source: {
    latinName: async (source, _, { dataSources }) => {
      const data = await dataSources.itsukaraLink.fetchSource(source.id);

      return data.latinName;
    },

    ruby: async (source, _, { dataSources }) => {
      const data = await dataSources.itsukaraLink.fetchSource(source.id);

      return data.ruby;
    },

    description: async (source, _, { dataSources }) => {
      const data = await dataSources.itsukaraLink.fetchSource(source.id);

      return data.description;
    },

    public: async (source, _, { dataSources }) => {
      const data = await dataSources.itsukaraLink.fetchSource(source.id);

      return data.public;
    },

    position: async (source, _, { dataSources }) => {
      const data = await dataSources.itsukaraLink.fetchSource(source.id);

      return data.position;
    },

    socialAccounts: async (source, _, { dataSources }) => {
      const data = await dataSources.itsukaraLink.fetchSource(source.id);

      return data.socialAccounts;
    },

    groups: async (source, _, { dataSources }) => {
      const groupsDataset = getGroupsByMembership(source.id);

      if (!groupsDataset) {
        return [];
      }

      const sources = await dataSources.itsukaraLink.fetchSources();

      const groups = groupsDataset.map(group => ({
        id: '',
        name: group.name,
        sources: group.sourceIds
          .map(sourceId => sources.find(source => source.id === sourceId))
          .filter((source): source is Source => !!source),
      }));

      return groups;
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
