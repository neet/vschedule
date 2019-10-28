import * as t from 'io-ts';

export const optional = (type: t.Mixed) => t.union([type, t.undefined, t.null]);

export const ResponseCodec = <T extends t.Mixed>(data: T) =>
  t.type({
    status: t.union([t.literal('ok'), t.literal('ng')]),
    data: data,
  });

export const LiverCodec = t.type({
  id: t.number,
  name: t.string,
  avatar: t.string,
  color: t.string,
  fullbody: optional(t.string),
  english_name: optional(t.string),
  furigana: optional(t.string),
  description: optional(t.string),
  public: optional(t.number),
  position: optional(t.number),
});

export type Liver = t.TypeOf<typeof LiverCodec>;

export const LiverTwitterAccountCodec = t.type({
  id: t.number,
  liver_id: t.number,
  screen_name: t.string,
});

export type LiverTwitterAccount = t.TypeOf<typeof LiverTwitterAccountCodec>;

export const LiverYoutubeChannelCodec = t.type({
  id: t.number,
  liver_id: t.number,
  channel: t.string,
  channel_name: t.string,
  creation_order: t.number,
});
export type LiverYoutubeChannel = t.TypeOf<typeof LiverYoutubeChannelCodec>;

export const LiverRelationshipCodec = t.type({
  liver: LiverCodec,
  liver_twitter_account: LiverTwitterAccountCodec,
  liver_youtube_channel: t.union([
    LiverYoutubeChannelCodec,
    t.array(LiverYoutubeChannelCodec),
  ]),
  liver_platform: optional(t.array(t.undefined)),
  user_liver: optional(t.null),
});
export type LiverRelationship = t.TypeOf<typeof LiverRelationshipCodec>;

export const GenreCodec = t.type({
  id: t.number,
  name: t.string,
});
export type Genre = t.TypeOf<typeof GenreCodec>;

export const EventCodec = t.type({
  id: t.number,
  name: t.string,
  description: t.string,
  public: t.number,
  url: t.string,
  thumbnail: t.string,
  start_date: t.string,
  end_date: t.string,
  recommend: t.boolean,
  genre: optional(GenreCodec),
  livers: t.array(LiverCodec),
});
export type Event = t.TypeOf<typeof EventCodec>;

export const EventsResponseCodec = ResponseCodec(
  t.type({ events: t.array(EventCodec) }),
);
export type EventsResponse = t.TypeOf<typeof EventsResponseCodec>;

export const EventResponseCodec = ResponseCodec(t.type({ event: EventCodec }));
export type EventResponse = t.TypeOf<typeof EventResponseCodec>;

export const LiversResponseCodec = ResponseCodec(
  t.type({
    liver_relationships: t.array(LiverRelationshipCodec),
  }),
);
export type LiversResponse = t.TypeOf<typeof LiversResponseCodec>;

export const LiverResponseCodec = ResponseCodec(LiverRelationshipCodec);
export type LiverResponse = t.TypeOf<typeof LiverResponseCodec>;

export const GenresResponseCodec = ResponseCodec(
  t.type({ genres: t.array(GenreCodec) }),
);
export type GenresResponse = t.TypeOf<typeof GenresResponseCodec>;
