export type Optional<T> = T | null | undefined;

export interface Response<Data> {
  status: 'ok' | 'ng';
  data: Data;
}

export interface Liver {
  id: number;
  name: string;
  avatar: string;
  color: string;
  fullbody: Optional<string>;
  english_name: Optional<string>;
  furigana: Optional<string>;
  description: Optional<string>;
  public: Optional<number>;
  position: Optional<number>;
}

export interface LiverTwitterAccount {
  id: number;
  liver_id: number;
  screen_name: string;
}

export interface LiverYoutubeChannel {
  id: number;
  liver_id: number;
  channel: string;
  channel_name: string;
  creation_order: number;
}

export interface LiverRelationship {
  liver: Liver;
  liver_twitter_account: LiverTwitterAccount;
  liver_youtube_channel: LiverYoutubeChannel | LiverYoutubeChannel[];
  liver_platform: Optional<[]>;
  user_liver: Optional<null>;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  public: number;
  url: string;
  thumbnail: string;
  start_date: string;
  end_date: string;
  recommend: boolean;
  genre: Optional<Genre>;
  livers: Liver[];
}

// DEAR ICHIKARA.
// Stop using envelope pattern and and use HTTP status codes instead.
export type EventsResponse = Response<{ events: Event[] }>;
export type EventResponse = Response<{ event: Event }>;
export type LiversResponse = Response<{
  liver_relationships: LiverRelationship[];
}>;
export type LiverResponse = Response<LiverRelationship>;
export type GenresResponse = Response<{ genres: Genre[] }>;
