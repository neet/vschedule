import Color from 'color';
import { URL } from 'url';

import {
  ActorDescription,
  ActorName,
  TwitterUsername,
  YoutubeChannelId,
} from '../../_shared/domain';
import { MediaAttachment } from '../../media-attachments/domain';

export interface ActorDto {
  readonly name: ActorName;
  readonly color: Color;
  readonly description: ActorDescription | null;
  readonly avatar: MediaAttachment | null;
  readonly url: URL | null;
  readonly twitterUsername: TwitterUsername | null;
  readonly youtubeChannelId: YoutubeChannelId | null;
}
