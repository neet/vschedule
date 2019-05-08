import SSR from '@ril/client';
import manifest from '@ril/client/static/build/manifest.json';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { APP_PORT } from './config';
import { dataSources } from './datasources';
import { resolvers } from './resolvers';

(async () => {
  const schemaPath = require.resolve('@ril/schema');
  const staticPath = path.resolve(
    require.resolve('@ril/client'),
    '../../static',
  );

  // tslint:disable-next-line:non-literal-fs-path
  const schema = await fs.readFile(schemaPath, 'utf-8').then(gql);

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    dataSources,
  });

  const app = express();
  server.applyMiddleware({ app, path: '/graphql' });

  // CORS
  app.use(cors());
  app.options('*', cors());

  // Static files
  app.use(express.static(staticPath));
  // Service worker
  app.use('/sw.js', (_, res) => {
    res.sendFile(path.resolve(staticPath, 'build/sw.js'));
  });
  // SSR
  app.use(async (req, res) => {
    res.send(
      `<!DOCTYPE html>\n${await SSR({
        manifest,
        location: req.url,
      })}`,
    );
  });

  app.listen({ port: APP_PORT });
})();
