import { promises as fs } from 'fs';
import path from 'path';
import SSR from '@ril/client';
import manifest from '@ril/client/static/build/manifest.json';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import i18nextMiddleware from 'i18next-express-middleware';
import { BIND_PORT } from './config';
import { dataSources } from './datasources';
import { resolvers } from './resolvers';
import { createI18n } from './utils/locale';

(async () => {
  const schemaPath = require.resolve('@ril/schema');
  const staticPath = path.resolve(
    require.resolve('@ril/client'),
    '../../static',
  );

  const schema = await fs.readFile(schemaPath, 'utf-8').then(gql);

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    dataSources,
  });

  const app = express();

  // Apollo
  server.applyMiddleware({ app, path: '/graphql' });

  // CORS
  app.use(cors());

  // I18next
  app.use(i18nextMiddleware.handle(createI18n()));

  // Static files
  app.use(express.static(staticPath));

  // Service worker
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
