import { DataUri, DataUriInvalidError } from './data-uri';

describe('DataUri', () => {
  it('can construct', () => {
    const str =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAPUlEQVR4nGPY18KQoMOQasC3q4GBIdeaIVFfrcHbKtGUgaHUyej/p7tX1y8ssmdg0GRg2NjabMTAWuzKAACg5RADO0S3DwAAAABJRU5ErkJggg==';
    const base64 = new DataUri(str);
    expect(base64.value).toBe(str);
  });

  it('throws an error for malformed', () => {
    expect(() => new DataUri('あいうえお')).toThrowError(DataUriInvalidError);
  });
});
