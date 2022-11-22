import Color from 'color';

import { TwitterUsername, YoutubeChannelId } from '../_shared';
import { OrganizationId } from '../organization';
import { Performer } from './performer';
import { PerformerDescription } from './performer-description';
import { PerformerName } from './performer-name';

export type PerformerFactoryCreateParams = {
  readonly url: URL | null;
  readonly youtubeChannelId: YoutubeChannelId;
  readonly twitterUsername: TwitterUsername | null;
  readonly organizationId: OrganizationId | null;

  /** @default string YouTube channel name  */
  readonly name?: PerformerName | null;

  /** @default string YouTube channel description  */
  readonly description: PerformerDescription | null;

  /** @default string Generated from Youtube avatar  */
  readonly color: Color | null;
};

export interface IPerformerFactory {
  create(params: PerformerFactoryCreateParams): Promise<Performer>;
}
