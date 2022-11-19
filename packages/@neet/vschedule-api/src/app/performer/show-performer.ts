import { inject, injectable } from 'inversify';

import { PerformerId, YoutubeChannelId } from '../../domain';
import { TYPES } from '../../types';
import { AppError, UnexpectedError } from '../_shared';
import { PerformerDto } from '../dto';
import { IPerformerQueryService } from './performer-query-service';

export class ShowPerformerNotFoundError extends AppError {
  public readonly name = 'ShowPerformerNotFoundError';

  public constructor(public readonly performerId: PerformerId) {
    super(`Performer with ID ${performerId} was not found`);
  }
}

export class ShowPerformerYoutubeChannelIdNotFoundError extends AppError {
  public readonly name = 'ShowPerformerYoutubeChannelIdNotFoundError';

  public constructor(public readonly youtubeChannelId: YoutubeChannelId) {
    super(
      `Performer with YouTube Channel ID ${youtubeChannelId} was not found`,
    );
  }
}

type ShowPerformerCommand =
  | { readonly id: string }
  | { readonly youtubeChannelId: string };

@injectable()
export class ShowPerformer {
  constructor(
    @inject(TYPES.PerformerQueryService)
    private readonly _performerQueryService: IPerformerQueryService,
  ) {}

  async invoke(command: ShowPerformerCommand): Promise<PerformerDto> {
    if ('id' in command) {
      const performerId = new PerformerId(command.id);
      const performer = await this._performerQueryService.query(performerId);

      if (performer == null) {
        throw new ShowPerformerNotFoundError(performerId);
      }

      return performer;
    }

    if ('youtubeChannelId' in command) {
      const youtubeChannelId = new YoutubeChannelId(command.youtubeChannelId);
      const performer =
        await this._performerQueryService.queryByYoutubeChannelId(
          youtubeChannelId,
        );

      if (performer == null) {
        throw new ShowPerformerYoutubeChannelIdNotFoundError(youtubeChannelId);
      }

      return performer;
    }

    throw new UnexpectedError();
  }
}
