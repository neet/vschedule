import Color from 'color';
import { Dayjs } from 'dayjs';
import { Duration } from 'dayjs/plugin/duration';
import { URL } from 'url';

import { TwitterUsername, YoutubeChannelId } from '../../domain/entities/_shared';
import {
  ActorDescription,
  ActorName,
  MediaAttachment,
  OrganizationId,
  PerformerId,
  StreamDescription,
  StreamId,
  StreamTitle,
} from '../../domain/entities';

export interface ActorDto {
  readonly name: ActorName;
  readonly color: Color;
  readonly description: ActorDescription | null;
  readonly avatar: MediaAttachment | null;
  readonly url: URL | null;
  readonly twitterUsername: TwitterUsername | null;
  readonly youtubeChannelId: YoutubeChannelId | null;
}

export interface OrganizationDto extends ActorDto {
  readonly id: OrganizationId;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
}

export interface PerformerDto extends ActorDto {
  readonly id: PerformerId;
  readonly organization: OrganizationDto | null;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
}

export interface StreamDto {
  readonly id: StreamId;
  readonly title: StreamTitle;
  readonly description: StreamDescription | null;
  readonly url: URL;
  readonly thumbnail: MediaAttachment | null;

  readonly owner: PerformerDto;
  readonly casts: readonly PerformerDto[];

  readonly startedAt: Dayjs;
  readonly endedAt: Dayjs | null;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
  readonly duration: Duration | null;
}
