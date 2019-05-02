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
  },
};
