import { Resolvers, YoutubeChannel } from './generated/graphql';

export const resolvers: Resolvers = {
  Query: {
    content: (_, { id }, { dataSources }) =>
      dataSources.itsukaraLink.fetchContent(id),

    contents: (_1, _2, { dataSources }) =>
      dataSources.itsukaraLink.fetchContents(),

    source: (_1, { id }, { dataSources }) =>
      dataSources.itsukaraLink.fetchSource(id),

    sources: (_1, _2, { dataSources }) =>
      dataSources.itsukaraLink.fetchSources(),
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
  },

  SocialAccount: {
    __resolveType: socialAccount => {
      if ((socialAccount as YoutubeChannel).channel) {
        return 'YoutubeChannel';
      }

      return 'TwitterAccount';
    },
  },
};
