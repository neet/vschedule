import dayjs from 'dayjs';
import { inject, injectable } from 'inversify';
import {
  Controller,
  Get,
  OnUndefined,
  Param,
  QueryParams,
} from 'routing-controllers';

import { ListStreams, ShowStream } from '../../../../app';
import { Methods } from '../../../generated/rest/v1/streams';
import { RestPresenter } from '../../../mappers';

@injectable()
@Controller('/rest/v1/streams')
export class StreamsController {
  constructor(
    @inject(ListStreams)
    private readonly _listStreams: ListStreams,

    @inject(ShowStream)
    private readonly _showStream: ShowStream,

    @inject(RestPresenter)
    private readonly _presenter: RestPresenter,
  ) {}

  @Get('/')
  async list(
    @QueryParams() query: Methods['get']['query'] = {},
  ): Promise<Methods['get']['resBody']> {
    const data = await this._listStreams.invoke({
      limit: query.limit,
      since: query.since != null ? dayjs(query.since) : undefined,
      until: query.until != null ? dayjs(query.until) : undefined,
      organizationId: query.organizationId,
    });

    return data.map((stream) => this._presenter.presentStream(stream));
  }

  @Get('/:streamId')
  @OnUndefined(404)
  async show(@Param('streamId') streamId: string) {
    const data = await this._showStream.invoke(streamId);

    if (data == null) {
      return;
    }

    const stream = data;
    return this._presenter.presentStream(stream);
  }
}
