import dayjs from 'dayjs';

import { ResubscriptionTask } from '../../../src/domain/entities/resubscription-task';
import { Token } from '../../../src/domain/entities/token';
import { IResubscriptionTaskRepository } from '../../../src/domain/repositories/resubscription-task-repository';
import { ITokenRepository } from '../../../src/domain/repositories/token-repository';
import { TYPES } from '../../../src/types';
import { createRequest } from '../../../test-utils/client';
import {
  container,
  mockYoutubeWebsubService,
} from '../../../test-utils/inversify-config';
import { login } from '../../../test-utils/login';
import { SEED_PERFORMER_ID } from '../../../test-utils/seed';

describe('Performer', () => {
  const { client, request } = createRequest();

  it('can create performer', async () => {
    const headers = await login(request);
    const { id } = await client.createPerformer(
      {
        requestBody: {
          name: '天宮こころ',
          twitterUsername: 'amamiya_kokoro',
          youtubeChannelId: 'UCkIimWZ9gBJRamKF0rmPU8w',
          url: null,
          organizationId: null,
        },
      },
      { headers },
    );

    const performer = await client.showPerformer({
      parameter: { performerId: id },
    });

    expect(performer.name).toMatch(/天宮こころ/);
    expect(performer.twitterUsername).toBe('amamiya_kokoro');
    expect(performer.youtubeChannelId).toBe('UCkIimWZ9gBJRamKF0rmPU8w');

    await request.post(`/auth/logout`);
  });

  it('cannot subscribe to a performer without token', async () => {
    const res = await request.post(
      `/rest/v1/performers/${SEED_PERFORMER_ID}/subscribe`,
    );

    expect(res.statusCode).toBe(401);
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
