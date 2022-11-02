import validator from 'validator';

import { ValueObject } from '../../_core';

export class InvalidStreamDescriptionError extends Error {}

export class StreamDescription extends ValueObject<string> {
  public constructor(value: string) {
    // https://www.tubics.com/blog/youtube-description-text#:~:text=YouTube%20gives%20you%205%2C000%20characters,text%20relevant%20to%20your%20video.
    if (!validator.isLength(value, { min: 1, max: 5000 })) {
      throw new InvalidStreamDescriptionError('Invalid Stream description');
    }

    super(value);
  }

  public static from = ValueObject.createFactory(StreamDescription);
}
