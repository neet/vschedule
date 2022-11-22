/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

import { PerformerId } from '../../../src/domain';
import { TaskService } from '../../../src/domain/services/task-service';
import { mockYoutubeWebsubService } from '../../../test-utils/mock-youtube-websub-service';
import { createAPI } from '../../../test-utils/api';
import { SEED_PERFORMER_ID } from '../../../test-utils/db-seed';
import { container } from '../../../test-utils/inversify-config';

describe('Performer', () => {
  it('cannot subscribe to a performer without token', async () => {
    const { api } = createAPI();

    await expect(
      api.rest.v1.performers._performerId(SEED_PERFORMER_ID).subscribe.post(),
    ).rejects.toMatchObject({
      status: 401,
    });
  });

  it('can subscribe to a performer with token', async () => {
    const { supertest } = createAPI();

    const taskService = container.get(TaskService);
    const task = await taskService.createTask(
      new PerformerId(SEED_PERFORMER_ID),
      dayjs().add(30, 'days'),
    );

    const res = await supertest
      .post(`/rest/v1/performers/${SEED_PERFORMER_ID}/subscribe`)
      .set('X-Authentication', task.token.id.value);

    expect(res.status).toBe(202);
    expect(mockYoutubeWebsubService.subscribeToChannel).toBeCalledWith(
      'UCV5ZZlLjk5MKGg3L0n0vbzw',
    );
  });
});
