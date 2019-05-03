import { RESTDataSource } from 'apollo-datasource-rest';
import {
  Content,
  Source,
  YoutubeChannel,
  TwitterAccount,
} from '../generated/graphql';

export interface Response<Data = any> {
  status: 'ok';
  data: Data;
}

export interface Liver {
  id: number;
  name: string;
  avatar: string;
  color: string;
  english_name?: string;
  furigana?: string;
  description?: string;
  public?: number;
  position?: number;
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
  liver_youtube_channel: LiverYoutubeChannel[];
}

export interface Event {
  id: number;
  name: string;
  description: string;
  public: number;
  url: string;
  start_date: string;
  end_date: string;
  recommend: boolean;
  liver: Liver;
}

// What's the heck...
type EventsResponse = Response<{ events: Event[] }>;
type EventResponse = Response<{ event: Event }>;
type LiversResponse = Response<{ liver_relationships: LiverRelationships[] }>;
type LiverResponse = Response<LiverRelationships>;

export class ItsukaraLinkAPI extends RESTDataSource {
  public constructor(baseURL = 'https://api.itsukaralink.jp/app') {
    super();
    this.baseURL = baseURL;
  }

  private reduceYoutubeChannel = (
    liverYoutubeChannel: LiverYoutubeChannel,
  ): YoutubeChannel => ({
    id: liverYoutubeChannel.id.toString(),
    source: liverYoutubeChannel.liver_id.toString(),
    channel: liverYoutubeChannel.channel,
    channelName: liverYoutubeChannel.channel_name,
    creationOrder: liverYoutubeChannel.creation_order,
  });

  private reduceTwitterAccount = (
    liverTwitterAccount: LiverTwitterAccount,
  ): TwitterAccount => ({
    id: liverTwitterAccount.id.toString(),
    source: liverTwitterAccount.liver_id.toString(),
    screenName: liverTwitterAccount.screen_name,
  });

  private reduceSource = (
    liver: Liver,
    twitter?: LiverTwitterAccount,
    youtubes?: LiverYoutubeChannel[],
  ): Source => {
    const source: Source = {
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

    if (youtubes) {
      youtubes.forEach(youtube => {
        source.socialAccounts.push(this.reduceYoutubeChannel(youtube));
      });
    }

    if (twitter) {
      source.socialAccounts.push(this.reduceTwitterAccount(twitter));
    }

    return source;
  };

  private reduceContent = (event: Event): Content => ({
    id: event.id.toString(),
    name: event.name,
    description: event.description,
    public: event.public,
    url: event.url,
    startDate: event.start_date,
    endDate: event.end_date,
    recommend: event.recommend,
    source: this.reduceSource(event.liver),
  });

  public fetchContents = async () => {
    const res = await this.get<EventsResponse>('events.json');
    return res.data.events.map(this.reduceContent);
  };

  public fetchContent = async (id: string) => {
    const res = await this.get<EventResponse>(`events/${id}.json`);
    return this.reduceContent(res.data.event);
  };

  public fetchSources = async () => {
    const res = await this.get<LiversResponse>('livers.json');

    return res.data.liver_relationships.map(data =>
      this.reduceSource(
        data.liver,
        data.liver_twitter_account,
        data.liver_youtube_channel,
      ),
    );
  };

  public fetchSource = async (id: string) => {
    const res = await this.get<LiverResponse>(`livers/${id}.json`);
    const data = res.data;

    return this.reduceSource(
      data.liver,
      data.liver_twitter_account,
      data.liver_youtube_channel,
    );
  };
}
