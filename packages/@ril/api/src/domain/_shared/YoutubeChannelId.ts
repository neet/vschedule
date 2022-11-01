import { ValueObject } from '../_core';

// https://webapps.stackexchange.com/questions/54443/format-for-id-of-youtube-video
export class YoutubeChannelId extends ValueObject<string> {
  public constructor(value: string) {
    super(value);
  }

  public static from = ValueObject.createFactory(YoutubeChannelId);
}
