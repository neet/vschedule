import { ValueObject } from '../utils';

// https://webapps.stackexchange.com/questions/54443/format-for-id-of-youtube-video
export class YoutubeChannelId extends ValueObject<string> {
  public static from(value: string): YoutubeChannelId {
    return new YoutubeChannelId(value);
  }
}
