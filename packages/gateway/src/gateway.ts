import * as gaxios from 'gaxios';
import {
  EventsResponse,
  EventResponse,
  GenresResponse,
  LiversResponse,
  LiverResponse,
} from './entities';

export class Gateway {
  readonly url: string;

  constructor(url: string) {
    this.url = url;

    gaxios.instance.defaults = {
      baseURL: this.url,
    };
  }

  private get = async <T>(url: string, params?: unknown) => {
    const res = await gaxios.request<T>({
      method: 'GET',
      url,
      params,
    });

    return res.data;
  };

  fetchEvents = () => this.get<EventsResponse>('/v1.2/events.json');

  fetchEvent = (id: number) =>
    this.get<EventResponse>(`/v1.2/events/${id}.json`);

  fetchGenres = () => this.get<GenresResponse>('/v1.2/genres.json');

  fetchLivers = () => this.get<LiversResponse>('/v1.2/livers.json');

  fetchLiver = (id: number) =>
    this.get<LiverResponse>(`/v1.2/livers/${id}.json`);
}
