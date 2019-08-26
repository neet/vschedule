import { RESTDataSource } from 'apollo-datasource-rest';
import * as G from 'src/generated/graphql';

export interface Response<Data = any> {
  status: 'ok' | 'ng';
  data: Data;
}

export interface Liver {
  id: number;
  name: string;
  avatar: string;
  color: string;
  english_name?: string | null;
  furigana?: string | null;
  description?: string | null;
  public?: number | null;
  position?: number | null;
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

export interface LiverRelationships {
  liver: Liver;
  liver_twitter_account: LiverTwitterAccount;
  liver_youtube_channel: LiverYoutubeChannel | LiverYoutubeChannel[];
  liver_platform?: [];
  user_liver?: null;
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
  genre?: Genre | null;
  livers: Liver[];
}

// DEAR ICHIKARA.
// Stop using envelope pattern and and use HTTP status codes instead.
type EventsResponse = Response<{ events: Event[] }>;
type EventResponse = Response<{ event: Event }>;
type LiversResponse = Response<{ liver_relationships: LiverRelationships[] }>;
type LiverResponse = Response<LiverRelationships>;
type GenresResponse = Response<{ genres: Genre[] }>;

export class ItsukaraLinkAPI extends RESTDataSource {
  constructor(baseURL: string) {
    super();
    this.baseURL = baseURL;
  }

  private reduceYoutubeChannel = (
    liverYoutubeChannel: LiverYoutubeChannel,
  ): G.YoutubeChannel => ({
    id: liverYoutubeChannel.id.toString(),
    source: liverYoutubeChannel.liver_id.toString(),
    channel: liverYoutubeChannel.channel,
    channelName: liverYoutubeChannel.channel_name,
    creationOrder: liverYoutubeChannel.creation_order,
  });

  private reduceTwitterAccount = (
    liverTwitterAccount: LiverTwitterAccount,
  ): G.TwitterAccount => ({
    id: liverTwitterAccount.id.toString(),
    source: liverTwitterAccount.liver_id.toString(),
    screenName: liverTwitterAccount.screen_name,
  });

  private reduceSource = (
    liver: Liver,
    twitter?: LiverTwitterAccount,
    youtube?: LiverYoutubeChannel | LiverYoutubeChannel[],
  ): G.Source => {
    const source: G.Source = {
      id: liver.id.toString(),
      name: liver.name,
      latinName: liver.english_name || '',
      ruby: liver.furigana || '',
      avatar: liver.avatar,
      color: liver.color,
      description: liver.description || '',
      public: liver.public || 1,
      position: liver.public || 0,
      socialAccounts: [],
    };

    if (youtube && Array.isArray(youtube)) {
      for (const item of youtube) {
        source.socialAccounts.push(this.reduceYoutubeChannel(item));
      }
    }

    if (youtube && !Array.isArray(youtube)) {
      source.socialAccounts.push(this.reduceYoutubeChannel(youtube));
    }

    if (twitter) {
      source.socialAccounts.push(this.reduceTwitterAccount(twitter));
    }

    return source;
  };

  private reduceGenre = (genre: Genre): G.Genre => ({
    id: genre.id.toString(),
    name: genre.name,
  });

  private reduceContent = (event: Event): G.Content => ({
    id: event.id.toString(),
    name: event.name,
    description: event.description,
    public: event.public,
    url: event.url,
    startDate: event.start_date,
    endDate: event.end_date,
    recommend: event.recommend,
    source: event.livers.map(live => this.reduceSource(live)),
    genre: event.genre ? this.reduceGenre(event.genre) : undefined,
  });

  fetchContents = async () => {
    const res = await this.get<EventsResponse>('/v1.2/events.json');

    return res.data.events.map(this.reduceContent);
  };

  fetchContent = async (id: string) => {
    const res = await this.get<EventResponse>(`/v1.2/events/${id}.json`);

    return this.reduceContent(res.data.event);
  };

  fetchGenre = async (id: string) => {
    const res = await this.get<GenresResponse>(`/v1.2/genre.json`);

    const genre = res.data.genres
      .map(genre => this.reduceGenre(genre))
      .find(genre => genre.id === id);

    if (!genre) {
      throw new Error('Genre not found');
    }

    return genre;
  };

  fetchGenres = async () => {
    const res = await this.get<GenresResponse>(`/v1.2/genre.json`);

    return res.data.genres.map(genre => this.reduceGenre(genre));
  };

  fetchSources = async () => {
    const res = await this.get<LiversResponse>('/v1.2/livers.json');

    return res.data.liver_relationships.map(liverRelationship =>
      this.reduceSource(
        liverRelationship.liver,
        liverRelationship.liver_twitter_account,
        liverRelationship.liver_youtube_channel,
      ),
    );
  };

  fetchSource = async (id: string) => {
    const res = await this.get<LiverResponse>(`/v1.2/livers/${id}.json`);

    return this.reduceSource(
      res.data.liver,
      res.data.liver_twitter_account,
      res.data.liver_youtube_channel,
    );
  };
}
