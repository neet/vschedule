import Color from 'color';
import { Dayjs } from 'dayjs';
import { Duration } from 'dayjs/plugin/duration';
import { URL } from 'url';

import {
  MediaAttachment,
  OrganizationDescription,
  OrganizationId,
  OrganizationName,
  PerformerDescription,
  PerformerId,
  PerformerName,
  StreamDescription,
  StreamId,
  StreamTitle,
  TwitterUsername,
  YoutubeChannelId,
} from '../domain';

export type OrganizationDto = {
  readonly id: OrganizationId;
  readonly name: OrganizationName;
  readonly color: Color;
  readonly description: OrganizationDescription | null;
  readonly avatar: MediaAttachment | null;
  readonly url: URL | null;
  readonly twitterUsername: TwitterUsername | null;
  readonly youtubeChannelId: YoutubeChannelId | null;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
};

export type PerformerDto = {
  readonly id: PerformerId;
  readonly name: PerformerName;
  readonly color: Color;
  readonly description: PerformerDescription | null;
  readonly avatar: MediaAttachment | null;
  readonly url: URL | null;
  readonly twitterUsername: TwitterUsername | null;
  readonly youtubeChannelId: YoutubeChannelId | null;
  readonly organization: OrganizationDto | null;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
};

export type StreamDto = {
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
};
