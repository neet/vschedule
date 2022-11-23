import Color from 'color';
import { Dayjs } from 'dayjs';
import { Duration } from 'dayjs/plugin/duration';

export type MediaAttachmentDto = {
  readonly id: string;
  readonly filename: string;
  readonly blurDataUri: string;
  readonly width: number;
  readonly height: number;
  readonly bucket: string | null;
  readonly remoteUrl: URL | null;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
};

export type BaseChannelDto<T> = {
  readonly type: T;
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
};

export type YoutubeChannelDto = BaseChannelDto<'youtube'> & {
  readonly youtubeChannelId: string;
};

export type TwicastingChannelDto = BaseChannelDto<'twicasting'> & {
  readonly twicastingScreenName: string;
};

export type ChannelDto = YoutubeChannelDto | TwicastingChannelDto;

export type OrganizationDto = {
  readonly id: string;
  readonly name: string;
  readonly color: Color;
  readonly description: string | null;
  readonly avatar: MediaAttachmentDto | null;
  readonly url: URL | null;
  readonly channels: ChannelDto[];
  readonly twitterUsername: string | null;
  readonly youtubeChannelId: string | null;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
};

export type PerformerDto = {
  readonly id: string;
  readonly name: string;
  readonly color: Color;
  readonly description: string | null;
  readonly avatar: MediaAttachmentDto | null;
  readonly url: URL | null;
  readonly channels: ChannelDto[];
  readonly twitterUsername: string | null;
  readonly youtubeChannelId: string | null;
  readonly organization: OrganizationDto | null;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
};

export type StreamDto = {
  readonly id: string;
  readonly title: string;
  readonly description: string | null;
  readonly url: URL;
  readonly thumbnail: MediaAttachmentDto | null;
  readonly owner: PerformerDto;
  readonly channelId: string;
  readonly participants: readonly PerformerDto[];
  readonly startedAt: Dayjs;
  readonly endedAt: Dayjs | null;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
  readonly duration: Duration | null;
};
