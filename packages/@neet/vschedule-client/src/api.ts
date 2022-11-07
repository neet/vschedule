/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type * as API from './types';

const API_URL = 'https://api.itsukaralink.jp';

const fetchEvents = async () =>
  fetch(`${API_URL}/v1.2/events.json`).then(
    async (r) => (await r.json()) as API.EventsResponse,
  );

const fetchLivers = async () =>
  fetch(`${API_URL}/v1.2/livers.json`).then(
    async (r) => (await r.json()) as API.LiversResponse,
  );

const fetchGenres = async () =>
  fetch(`${API_URL}/v1.2/genres.json`).then(
    async (r) => (await r.json()) as API.GenresResponse,
  );

const fetchProxyEvents = async () =>
  fetch('/api/v1.2/events.json').then(
    async (r) => (await r.json()) as API.EventsResponse,
  );

const fetchProxyGenres = async () =>
  fetch('/api/v1.2/genres.json').then(
    async (r) => (await r.json()) as API.GenresResponse,
  );

const fetchProxyLivers = async () =>
  fetch('/api/v1.2/livers.json').then(
    async (r) => (await r.json()) as API.LiversResponse,
  );

export const api = {
  fetchEvents,
  fetchGenres,
  fetchLivers,
};

export const proxyAPI = {
  fetchEvents: fetchProxyEvents,
  fetchGenres: fetchProxyGenres,
  fetchLivers: fetchProxyLivers,
};
