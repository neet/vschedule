import { inject, injectable } from 'inversify';
import { JsonController, OnUndefined, Param, Post } from 'routing-controllers';

import { RequestChannelSubscription } from '../../../../app/channel/request-channel-subscription';

@injectable()
@JsonController('/rest/v1/channels')
export class ChannelController {
  constructor(
    @inject(RequestChannelSubscription)
    private readonly requestChannelSubscription: RequestChannelSubscription,
  ) {}

  @Post('/:channelId/subscribe')
  @OnUndefined(202)
  async subscribe(@Param('channelId') channelId: string): Promise<void> {
    await this.requestChannelSubscription.invoke({ channelId });
  }
}
