// eslint-disable-next-line import/no-unassigned-import
import 'reflect-metadata';
import { promises as fs } from 'fs';
import path from 'path';
import SSR from '@ril/client';
import manifest from '@ril/client/static/build/manifest.json';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import i18nextMiddleware from 'i18next-express-middleware';
import { createConnection } from 'typeorm';
import { BIND_PORT } from './config';
import { dataSources } from './datasources';
import { resolvers } from './resolvers';
import { createI18n } from './utils/locale';
import { StreamerCron } from './workers/streamers';

(async () => {
  const schemaPath = require.resolve('@ril/schema');
  const clientPath = require.resolve('@ril/client');
  const staticPath = path.resolve(clientPath, '../../static');

  const typeDefs = await fs.readFile(schemaPath, 'utf-8').then(gql);

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers,
    dataSources,
  });

  // Crons
  const connection = await createConnection();
  new StreamerCron(connection);

  const app = express();

  app.use(cors());
  app.use(express.static(staticPath));
  app.use(i18nextMiddleware.handle(createI18n()));
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  // SW
  app.use('/sw.js', (_, res) => {
    res.sendFile(path.resolve(staticPath, 'build/sw.js'));
  });

  // SSR
  app.use(async (req, res) => {
    const result = await SSR({
      manifest,
      i18n: req.i18n,
      location: req.url,
    });

    res.status(result.statusCode);
    res.send(`<!DOCTYPE html>\n${result.staticMarkup}`);
  });

  app.listen({ port: BIND_PORT });
})();
