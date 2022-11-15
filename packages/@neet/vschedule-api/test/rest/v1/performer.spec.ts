/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import { SuperTest, Test } from 'supertest';

import { ApiInstance } from '../../../src/adapters/generated/$api';
import {
  IResubscriptionTaskRepository,
  ITokenRepository,
} from '../../../src/domain';
import { ResubscriptionTask } from '../../../src/domain/entities/resubscription-task';
import { Token } from '../../../src/domain/entities/token';
import { mockYoutubeWebsubService } from '../../../src/infra/services/youtube-websub-service-mock';
import { TYPES } from '../../../src/types';
import { createRequest } from '../../../test-utils/api';
import { container } from '../../../test-utils/inversify-config';
import { login } from '../../../test-utils/login';
import { SEED_PERFORMER_ID } from '../../../test-utils/seed';

describe('Performer', () => {
  let api!: ApiInstance;
  let request!: SuperTest<Test>;

  beforeAll(() => {
    const config = createRequest(container);
    api = config.api;
    request = config.request;
  });

  it('can create performer', async () => {
    const headers = await login(request);
    const { id } = await api.rest.v1.performers.$post({
      body: {
        name: '天宮こころ',
        twitterUsername: 'amamiya_kokoro',
        youtubeChannelId: 'UCkIimWZ9gBJRamKF0rmPU8w',
        url: null,
        organizationId: null,
      },
      headers,
    } as any);

    const performer = await api.rest.v1.performers._performerId(id).$get();

    expect(performer.name).toMatch(/天宮こころ/);
    expect(performer.twitterUsername).toBe('amamiya_kokoro');
    expect(performer.youtubeChannelId).toBe('UCkIimWZ9gBJRamKF0rmPU8w');

    await request.post(`/auth/logout`);
  });

  it('cannot subscribe to a performer without token', async () => {
    await expect(
      api.rest.v1.performers._performerId(SEED_PERFORMER_ID).subscribe.post(),
    ).rejects.toMatchObject({
      status: 401,
    });
  });

  it('can subscribe to a performer with token', async () => {
    const resubscriptionTaskRepository =
      container.get<IResubscriptionTaskRepository>(
        TYPES.ResubscriptionTaskRepository,
      );
    const tokenRepository = container.get<ITokenRepository>(
      TYPES.TokenRepository,
    );
    const token = Token.create();
    await tokenRepository.create(token);

    await resubscriptionTaskRepository.create(
      ResubscriptionTask.create({
        performerId: SEED_PERFORMER_ID,
        token,
        scheduledAt: dayjs(),
      }),
    );

    await request
      .post(`/rest/v1/performers/${SEED_PERFORMER_ID}/subscribe`)
      .set('X-Authentication', token.id.value);

    expect(mockYoutubeWebsubService.subscribeToChannel).toBeCalledWith(
      'UCV5ZZlLjk5MKGg3L0n0vbzw',
    );
  });
});
