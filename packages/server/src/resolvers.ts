import { Resolvers } from './generated/graphql';

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

    genres: (_1, _2, { dataSources }) => dataSources.itsukaraLink.fetchGenres(),

    genre: (_1, { id }, { dataSources }) =>
      dataSources.itsukaraLink.fetchGenre(id),
  },

  Source: {
    // The value of property `liver_youtube_channel` is either an array of object
    // or just a single object depending on whether it is fetched from `/livers` or `/livers/${id}`
    // so when `socialAccounts` field requested, we fill the missing data by fetching it from `/livers/${id}`
    socialAccounts: async (source, _, { dataSources }) => {
      const data = await dataSources.itsukaraLink.fetchSource(source.id);

      return data.socialAccounts;
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
