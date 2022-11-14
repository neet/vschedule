import Color from 'color';

import {
  ActorDescription,
  ActorName,
  TwitterUsername,
  YoutubeChannelId,
} from '../_shared';
import { OrganizationId } from '../organization';
import { Performer } from './performer';

export interface PerformerFactoryCreateParams {
  readonly url: URL | null;
  readonly youtubeChannelId: YoutubeChannelId;
  readonly twitterUsername: TwitterUsername | null;
  readonly organizationId: OrganizationId | null;

  /** @default string YouTube channel name  */
  readonly name?: ActorName | null;

  /** @default string YouTube channel description  */
  readonly description: ActorDescription | null;

  /** @default string Generated from Youtube avatar  */
  readonly color: Color | null;
}

export interface IPerformerFactory {
  create(params: PerformerFactoryCreateParams): Promise<Performer>;
}
