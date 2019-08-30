import gaxios from 'gaxios';
import { Response, Event, Genre, Liver, LiverRelationships } from './entities';

export class Gateway {
  readonly url: string;

  constructor(url: string) {
    this.url = url;

    gaxios.instance.defaults = {
      baseURL: this.url,
    };
  }

  fetchEvents = () =>
    gaxios.request<Response<Event[]>>({
      method: 'GET',
      url: '/v1.2/events.json',
    });

  fetchEvent = (id: number) =>
    gaxios.request<Response<Event[]>>({
      method: 'GET',
      url: `/v1.2/events/${id}.json`,
    });

  fetchGenres = () =>
    gaxios.request<Response<Genre[]>>({
      method: 'GET',
      url: '/v1.2/genres.json',
    });

  fetchLivers = () =>
    gaxios.request<Response<Liver[]>>({
      method: 'GET',
      url: '/v1.2/livers.json',
    });

  fetchLiverRelationship = (id: number) =>
    gaxios.request<Response<LiverRelationships>>({
      method: 'GET',
      url: `/v1.2/livers/${id}.json`,
    });
}
