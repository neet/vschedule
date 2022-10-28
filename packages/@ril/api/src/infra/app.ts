import 'reflect-metadata';

import api from '@ril/api-spec';
import dayjs from 'dayjs';
import DurationPlugin from 'dayjs/plugin/duration';
import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import xmlParser from 'express-xml-bodyparser';
import { useContainer, useExpressServer } from 'routing-controllers';
import swaggerUi from 'swagger-ui-express';

import { ActorController } from '../adapters/controllers/api/v1/actors';
import { MediaAttachmentController } from '../adapters/controllers/api/v1/media';
import { StreamsRestApiController } from '../adapters/controllers/api/v1/streams';
import { YoutubeWebhookController } from '../adapters/controllers/webhook/youtube';
import { YoutubeWebhookRefreshController } from '../adapters/controllers/webhook/youtube/refresh';
import { IAppConfig } from '../app/services/AppConfig/AppConfig';
import { TYPES } from '../types';
import { InversifyAdapter } from './inversify-adapter';
import { container } from './inversify-config';

dayjs.extend(DurationPlugin);

const inversifyAdapter = new InversifyAdapter(container);
useContainer(inversifyAdapter);

const config = container.get<IAppConfig>(TYPES.AppConfig);

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }), xmlParser());

app.use(
  '/api',
  OpenApiValidator.middleware({
    validateApiSpec: false, // なんかwebhookが使えない？
    apiSpec: require.resolve('@ril/api-spec'),
  }),
);

useExpressServer(app, {
  classTransformer: false,
  validation: false,
  controllers: [
    ActorController,
    MediaAttachmentController,
    StreamsRestApiController,
    YoutubeWebhookController,
    YoutubeWebhookRefreshController,
  ],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(api));

app.listen(config.entries.server.port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `server is ready at http://localhost:${config.entries.server.port}/api-docs`,
  );
});
