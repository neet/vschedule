import Color from 'color';

import {
  ActorDescription,
  ActorName,
  TwitterUsername,
  YoutubeChannelId,
} from '../_shared';
import { Organization } from './organization';

export interface OrganizationFactoryCreateParams {
  readonly name: ActorName;
  readonly url: URL | null;
  readonly description: ActorDescription | null;
  readonly color: Color | null;
  readonly youtubeChannelId: YoutubeChannelId | null;
  readonly twitterUsername: TwitterUsername | null;
}

export interface IOrganizationFactory {
  create(params: OrganizationFactoryCreateParams): Promise<Organization>;
}
