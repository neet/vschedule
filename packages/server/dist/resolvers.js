"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = {
    Query: {
        content: (_, { id }, { dataSources }) => dataSources.itsukaraLink.fetchContent(id),
        contents: (_1, _2, { dataSources }) => dataSources.itsukaraLink.fetchContents(),
        source: (_1, { id }, { dataSources }) => dataSources.itsukaraLink.fetchSource(id),
        sources: (_1, _2, { dataSources }) => dataSources.itsukaraLink.fetchSources(),
    },
    Source: {
        latinName: (source, _, { dataSources }) => __awaiter(this, void 0, void 0, function* () {
            const data = yield dataSources.itsukaraLink.fetchSource(source.id);
            return data.latinName;
        }),
        ruby: (source, _, { dataSources }) => __awaiter(this, void 0, void 0, function* () {
            const data = yield dataSources.itsukaraLink.fetchSource(source.id);
            return data.ruby;
        }),
        description: (source, _, { dataSources }) => __awaiter(this, void 0, void 0, function* () {
            const data = yield dataSources.itsukaraLink.fetchSource(source.id);
            return data.description;
        }),
        public: (source, _, { dataSources }) => __awaiter(this, void 0, void 0, function* () {
            const data = yield dataSources.itsukaraLink.fetchSource(source.id);
            return data.public;
        }),
        position: (source, _, { dataSources }) => __awaiter(this, void 0, void 0, function* () {
            const data = yield dataSources.itsukaraLink.fetchSource(source.id);
            return data.position;
        }),
        socialAccounts: (source, _, { dataSources }) => __awaiter(this, void 0, void 0, function* () {
            const data = yield dataSources.itsukaraLink.fetchSource(source.id);
            return data.socialAccounts;
        }),
    },
    SocialAccount: {
        __resolveType: (socialAccount) => {
            if (socialAccount.channel) {
                return 'YoutubeChannel';
            }
            return 'TwitterAccount';
        }
    }
};
