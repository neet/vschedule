import {
  Channel,
  ChannelId,
  ChannelYoutube,
  OrganizationId,
  PerformerId,
  YoutubeChannelId,
} from '../../domain';

export interface IChannelRepository {
  create(channel: Channel): Promise<void>;
  update(channel: Channel): Promise<void>;
  findById(channelId: ChannelId): Promise<Channel | null>;
  findByOwnerId(ownerId: PerformerId | OrganizationId): Promise<Channel[]>;
  findByYoutubeChannelId(
    youtubeChannelId: YoutubeChannelId,
  ): Promise<ChannelYoutube | null>;
}
