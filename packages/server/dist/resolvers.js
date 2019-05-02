"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = {
    Query: {
        content: (_, { id }, { dataSources }) => dataSources.itsukaraLink.fetchContent(id),
        contents: (_1, _2, { dataSources }) => dataSources.itsukaraLink.fetchContents(),
        source: (_1, { id }, { dataSources }) => dataSources.itsukaraLink.fetchSource(id),
        sources: (_1, _2, { dataSources }) => dataSources.itsukaraLink.fetchSources(),
    },
};
