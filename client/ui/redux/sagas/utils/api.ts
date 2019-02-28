import * as querystring from "querystring";
import { Event } from '../../../../../shared/entities/event';
import { Response } from "../../../../../shared/entities/response";

export class ItsukaraLink {
  public constructor(protected baseUrl: string) {}

  protected async request<T>(url: string, params?: RequestInit) {
    return (await fetch(url, params)
      .then(res => res.json() as Promise<Response<T>>)
      .then(json => json.data)) as T;
  }

  protected async get<T>(url: string, params?: { [K: string]: any }) {
    return this.request<T>(`${url}?${querystring.stringify(params)}`);
  }

  public fetchEvents = async () => {
    return await this.get<Event[]>(`${this.baseUrl}/events.json`);
  };
}

export const api = new ItsukaraLink(process.env.API_URL);
