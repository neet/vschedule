import { IsString } from 'class-validator';
import { inject, injectable } from 'inversify';
import { Body, JsonController, Post } from 'routing-controllers';

import { RefreshYoutubeWebSubSubscription } from '../../../../app/use-cases/RefreshYoutubeWebHubSubscription';

class RefreshParams {
  @IsString()
  readonly actorId!: string;
}

@injectable()
@JsonController('/webhook/youtube/refresh')
export class YoutubeWebhookRefreshController {
  public constructor(
    @inject(RefreshYoutubeWebSubSubscription)
    private readonly _refreshYoutubeWebSubSubscription: RefreshYoutubeWebSubSubscription,
  ) {}

  @Post('/')
  public async refresh(@Body() body: RefreshParams) {
    await this._refreshYoutubeWebSubSubscription.invoke({
      actorId: body.actorId,
    });
  }
}
