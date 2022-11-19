import { inject, injectable } from 'inversify';

import { IStreamFactory, IStreamRepository } from '../../domain';
import { TYPES } from '../../types';
import { ILogger, UnexpectedError } from '../_shared';
import { StreamDto } from '../dto';
import { IStreamQueryService } from './stream-query-service';

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

    @inject(TYPES.StreamFactory)
    private readonly _streamFactory: IStreamFactory,

    @inject(TYPES.Logger)
    private readonly _logger: ILogger,
  ) {}

  async invoke(command: UpsertStreamCommand): Promise<StreamDto> {
    const stream = await this._streamFactory.createFromVideoId(command.videoId);
    await this._streamRepository.upsert(stream);

    this._logger.info(`Stream ${stream.id} "${stream.title}" is created`, {
      stream,
    });

    const result = await this._streamQueryService.query(stream.id);
    if (result == null) {
      throw new UnexpectedError();
    }
    return result;
  }
}
