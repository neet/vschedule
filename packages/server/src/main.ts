import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import { promises as fs } from 'fs';
import { gql, ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolvers';
import { dataSources } from './datasources';
import { APP_PORT } from './config';

const schemaPath = path.resolve(
  __dirname,
  '../node_modules/@ril/schema/schema.gql',
);
const staticDir = path.resolve(__dirname, '../node_modules/@ril/client/static');

(async () => {
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
  app.use(express.static(staticDir));
  // Service worker
  app.use('/sw.js', (_, res) =>
    res.sendFile(path.resolve(staticDir, 'build/sw.js')),
  );
  // SPA
  app.use('/*', (_, res) =>
    res.sendFile(path.resolve(staticDir, 'build/index.html')),
  );

  app.listen({ port: APP_PORT });
})();
