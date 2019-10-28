import * as t from 'io-ts';

export const Response = <T extends t.Mixed>(data: T) =>
  t.type({
    status: t.union([t.literal('ok'), t.literal('ng')]),
    data: data,
  });

export const optional = (type: t.Mixed) => t.union([type, t.undefined, t.null]);

export const Liver = t.type({
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

export const LiverTwitterAccount = t.type({
  id: t.number,
  liver_id: t.number,
  screen_name: t.string,
});

export const LiverYoutubeChannel = t.type({
  id: t.number,
  liver_id: t.number,
  channel: t.string,
  channel_name: t.string,
  creation_order: t.string,
});

export const LiverRelationship = t.type({
  liver: Liver,
  liver_twitter_account: LiverTwitterAccount,
  liver_youtube_channel: t.union([
    LiverYoutubeChannel,
    t.array(LiverYoutubeChannel),
  ]),
  liver_platform: optional(t.array(t.undefined)),
  user_liver: optional(t.null),
});

export const Genre = t.type({
  id: t.number,
  name: t.string,
});

export const Event = t.type({
  id: t.number,
  name: t.string,
  description: t.string,
  public: t.number,
  url: t.string,
  thumbnail: t.string,
  start_date: t.string,
  end_date: t.string,
  recommend: t.boolean,
  genre: optional(Genre),
  livers: t.array(Liver),
});

// DEAR ICHIKARA.
// Stop using envelope pattern and and use HTTP status codes instead.
export const EventsResponse = Response(t.type({ events: t.array(Event) }));
export const EventResponse = Response(t.type({ event: Event }));
export const LiversResponse = Response(
  t.type({
    liver_relationships: t.array(LiverRelationship),
  }),
);
export const LiverResponse = Response(LiverRelationship);
export const GenresResponse = Response(t.type({ genres: t.array(Genre) }));
