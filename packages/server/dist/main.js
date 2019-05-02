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
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs_1 = require("fs");
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = require("./resolvers");
const datasources_1 = require("./datasources");
const schemaPath = path.resolve(__dirname, '../node_modules/@ril/schema/schema.gql');
(() => __awaiter(this, void 0, void 0, function* () {
    const schema = yield fs_1.promises.readFile(schemaPath, 'utf-8').then(apollo_server_express_1.gql);
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: schema,
        resolvers: resolvers_1.resolvers,
        dataSources: datasources_1.dataSources,
    });
    const app = express();
    server.applyMiddleware({ app, path: '/graphql' });
    app.use(cors());
    app.listen({ port: 3000 });
}))();
