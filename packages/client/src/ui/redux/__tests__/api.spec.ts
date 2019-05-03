import 'jest-fetch-mock';
import { ItsukaraLink } from 'client/ui/redux/api';

describe('API clinet', () => {
  const baseUrl = 'http://test';
  const api = new ItsukaraLink(baseUrl);

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('fetch events', async () => {
    fetchMock.mockResponse(JSON.stringify({ body: '' }));
    await api.fetchEvents();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}/api/events.json?`, {});
  });
});
