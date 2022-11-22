import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { IYoutubeApiService, Video } from '../_external';
import { AppError, ILogger, UnexpectedError } from '../_shared';
import { StreamDto } from '../dto';
import { StreamFactory } from './stream-factory-impl';
import { IStreamQueryService } from './stream-query-service';
import { IStreamRepository } from './stream-repository';

export class CreateStreamFailedToFetchVideoError extends AppError {
  public readonly name = 'CreateStreamFailedToFetchVideoError';

  public constructor(
    public readonly videoId: string,
    public readonly cause: unknown,
  ) {
    super(`No video found with ID ${videoId}`);
  }
}

export type UpsertStreamCommand = {
  readonly videoId: string;
};

@injectable()
export class UpsertStream {
  constructor(
    @inject(TYPES.StreamQueryService)
    private readonly _streamQueryService: IStreamQueryService,

    @inject(TYPES.StreamRepository)
    private readonly _streamRepository: IStreamRepository,

    @inject(StreamFactory)
    private readonly _streamFactory: StreamFactory,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,

    @inject(TYPES.YoutubeApiService)
    private readonly _youtubeApiService: IYoutubeApiService,
  ) {}

  async invoke(command: UpsertStreamCommand): Promise<StreamDto> {
    const video = await this._fetchVideoById(command.videoId);
    const stream = await this._streamFactory.createFromVideo(video);
    await this._streamRepository.upsert(stream);

    this._logger.info(`Stream ${stream.id} "${stream.title}" is created`, {
      stream,
    });

    const result = await this._streamQueryService.query(stream.id);
    if (result == null) throw new UnexpectedError();
    return result;
  }

  private async _fetchVideoById(videoId: string): Promise<Video> {
    try {
      const video = await this._youtubeApiService.fetchVideo(videoId);
      return video;
    } catch (error) {
      throw new CreateStreamFailedToFetchVideoError(videoId, error);
    }
  }
}
