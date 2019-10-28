import * as gaxios from 'gaxios';
import { isLeft, toError } from 'fp-ts/lib/Either';
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

  fetchEvents = async () => {
    const data = await this.get('/v1.2/events.json');
    const response = EventsResponse.decode(data);
    if (isLeft(response)) throw toError(response.left);
    return response.right;
  };

  fetchEvent = async (id: number) => {
    const data = await this.get(`/v1.2/events/${id}.json`);
    const response = EventResponse.decode(data);
    if (isLeft(response)) throw toError(response.left);
    return response.right;
  };

  fetchGenres = async () => {
    const data = await this.get('/v1.2/genres.json');
    const response = GenresResponse.decode(data);
    if (isLeft(response)) throw toError(response.left);
    return response.right;
  };

  fetchLivers = async () => {
    const data = await this.get('/v1.2/livers.json');
    const response = LiversResponse.decode(data);
    if (isLeft(response)) throw toError(response.left);
    return response.right;
  };

  fetchLiver = async (id: number) => {
    const data = await this.get(`/v1.2/livers/${id}.json`);
    const response = LiverResponse.decode(data);
    if (isLeft(response)) throw toError(response.left);
    return response.right;
  };
}
