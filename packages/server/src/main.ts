import { ApolloServer, gql } from 'apollo-server-express';
import * as cors from 'cors';
import * as express from 'express';
import { promises as fs } from 'fs';
import * as path from 'path';
import { APP_PORT } from './config';
import { dataSources } from './datasources';
import { resolvers } from './resolvers';

const schemaPath = path.resolve(
  __dirname,
  '../node_modules/@ril/schema/schema.gql',
);
const staticDir = path.resolve(__dirname, '../node_modules/@ril/client/static');

(async () => {
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
