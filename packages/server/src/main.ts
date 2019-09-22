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
import { BIND_PORT } from './config';
import { createConnection } from './db';
import { createContext } from './context';
import { resolvers } from './resolvers';
import { createI18n } from './utils/locale';
import { ActivityCron } from './workers/activity';
import { PerformerCron } from './workers/performer';
import { CategoryCron } from './workers/category';

(async () => {
  const schemaPath = require.resolve('@ril/schema');
  const clientPath = require.resolve('@ril/client');
  const staticPath = path.resolve(clientPath, '../../static');

  const typeDefs = await fs.readFile(schemaPath, 'utf-8').then(gql);
  const connection = await createConnection();

  // Crons
  new PerformerCron(connection);
  new ActivityCron(connection);
  new CategoryCron(connection);

  // Apollo
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => createContext(connection),
  });

  // Express
  const app = express();
  app.use(cors());
  app.use(express.static(staticPath));
  app.use(i18nextMiddleware.handle(createI18n()));
  app.use(apolloServer.getMiddleware({ path: '/graphql' }));

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

  app.listen({ port: BIND_PORT }, () => {
    // eslint-disable-next-line no-console
    console.log(
      `🎉 GraphQL server is running at http://localhost:${BIND_PORT}/graphql`,
    );
  });
})();
