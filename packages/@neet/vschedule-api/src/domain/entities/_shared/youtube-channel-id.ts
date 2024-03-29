import { ValueObject } from '../../_core';

// https://webapps.stackexchange.com/questions/54443/format-for-id-of-youtube-video
export class YoutubeChannelId extends ValueObject<string> {
  readonly #brand!: never;

  public constructor(value: string | YoutubeChannelId) {
    if (value instanceof YoutubeChannelId) {
      return value;
    }
    super(value);
  }
}
