import { IPerformerRepository, Performer } from '../domain';

export interface ListPerformersParams {
  readonly limit?: number;
  readonly offset?: number;
}

export class ListPerformers {
  constructor(private readonly _performerRepository: IPerformerRepository) {}

  async invoke(params?: ListPerformersParams): Promise<Performer[]> {
    const actors = await this._performerRepository.find({
      limit: params?.limit,
      offset: params?.offset,
    });

    return actors;
  }
}
