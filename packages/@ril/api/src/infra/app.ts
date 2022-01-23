import 'reflect-metadata';

import dayjs from 'dayjs';
import DurationPlugin from 'dayjs/plugin/duration';
import express from 'express';
import xmlParser from 'express-xml-bodyparser';
import { useContainer, useExpressServer } from 'routing-controllers';

import { MediaAttachmentController } from '../adapters/controllers/api/v1/media';
import { StreamsRestApiController } from '../adapters/controllers/api/v1/streams';
import { YoutubeWebhookController } from '../adapters/controllers/webhook/youtube';
import { container } from './inversify.config';
import { InversifyAdapter } from './inversify-adapter';

dayjs.extend(DurationPlugin);

const inversifyAdapter = new InversifyAdapter(container);
useContainer(inversifyAdapter);

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }), xmlParser());

useExpressServer(app, {
  controllers: [
    YoutubeWebhookController,
    StreamsRestApiController,
    MediaAttachmentController,
  ],
});

app.listen(process.env.PORT ?? 3000, () => {
  // eslint-disable-next-line no-console
  console.log('server is ready at http://localhost:3000');
});
