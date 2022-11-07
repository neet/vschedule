/* eslint-disable @typescript-eslint/naming-convention */
export interface Response<Data> {
  readonly status: 'ng' | 'ok';
  readonly data: Data;
}

export interface Liver {
  readonly id: number;
  readonly name: string;
  readonly avatar: string;
  readonly color: string;
  readonly english_name?: string;
  readonly furigana?: string;
  readonly description?: string;
  readonly public?: number;
  readonly position?: number;
}

export interface Genre {
  readonly id: number;
  readonly name: string;
}

export interface Event {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly public: number;
  readonly url: string;
  readonly thumbnail: string;
  readonly start_date: string;
  readonly end_date: string;
  readonly recommend: boolean;
  readonly genre?: Genre;
  readonly livers: readonly Liver[];
}

export interface LiverTwitterAccount {
  readonly id: number;
  readonly liver_id: number;
  readonly screen_name: string;
}

export interface LiverYoutubeChannel {
  readonly id: number;
  readonly liver_id: number;
  readonly channel: string;
  readonly channel_name: string;
  readonly creation_order: number;
}

export interface LiverRelationships {
  readonly liver: Liver;
  readonly liver_twitter_account: LiverTwitterAccount;
  readonly liver_youtube_channel: LiverYoutubeChannel;
  readonly liver_platform?: [];
  readonly user_liver?: null;
}

export type GenresResponse = Response<{ readonly genres: readonly Genre[] }>;
export type EventsResponse = Response<{ readonly events: readonly Event[] }>;
export type EventResponse = Response<{ readonly event: Event }>;
export type LiversResponse = Response<{
  readonly liver_relationships: readonly LiverRelationships[];
}>;
