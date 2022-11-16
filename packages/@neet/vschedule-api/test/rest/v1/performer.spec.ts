/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

import {
  IResubscriptionTaskRepository,
  ITokenRepository,
} from '../../../src/domain';
import { ResubscriptionTask } from '../../../src/domain/entities/resubscription-task';
import { Token } from '../../../src/domain/entities/token';
import { mockYoutubeWebsubService } from '../../../src/infra/services/youtube-websub-service-mock';
import { TYPES } from '../../../src/types';
import { getAPI } from '../../../test-utils/api';
import { container } from '../../../test-utils/inversify-config';
import { SEED_PERFORMER_ID } from '../../../test-utils/seed';

describe('Performer', () => {
  it('can create performer', async () => {
    const { api } = getAPI();

    await api.auth.login.$post({
      body: {
        email: 'test@example.com',
        password: 'password',
      },
    });

    const { id } = await api.rest.v1.performers.$post({
      body: {
        name: '天宮こころ',
        twitterUsername: 'amamiya_kokoro',
        youtubeChannelId: 'UCkIimWZ9gBJRamKF0rmPU8w',
        url: null,
        organizationId: null,
      },
    });

    const performer = await api.rest.v1.performers._performerId(id).$get();

    expect(performer.name).toMatch(/天宮こころ/);
    expect(performer.twitterUsername).toBe('amamiya_kokoro');
    expect(performer.youtubeChannelId).toBe('UCkIimWZ9gBJRamKF0rmPU8w');
  });

  it('cannot subscribe to a performer without token', async () => {
    const { api } = getAPI();

    await expect(
      api.rest.v1.performers._performerId(SEED_PERFORMER_ID).subscribe.post(),
    ).rejects.toMatchObject({
      status: 401,
    });
  });

  it('can subscribe to a performer with token', async () => {
    const { request } = getAPI();

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

    const res = await request
      .post(`/rest/v1/performers/${SEED_PERFORMER_ID}/subscribe`)
      .set('X-Authentication', token.id.value);

    expect(res.status).toBe(202);
    expect(mockYoutubeWebsubService.subscribeToChannel).toBeCalledWith(
      'UCV5ZZlLjk5MKGg3L0n0vbzw',
    );
  });
});
