import Color from 'color';

import { TwitterUsername, YoutubeChannelId } from '../_shared';
import { Organization } from './organization';
import { OrganizationDescription } from './organization-description';
import { OrganizationName } from './organization-name';

export type OrganizationFactoryCreateParams = {
  readonly name: OrganizationName;
  readonly url: URL | null;
  readonly description: OrganizationDescription | null;
  readonly color: Color | null;
  readonly youtubeChannelId: YoutubeChannelId | null;
  readonly twitterUsername: TwitterUsername | null;
};

export interface IOrganizationFactory {
  create(params: OrganizationFactoryCreateParams): Promise<Organization>;
}
