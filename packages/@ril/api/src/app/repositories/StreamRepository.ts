import { Stream } from '@ril/core';

export interface ListStreamsParams {
  readonly limit?: number;
}

export interface StreamRepository {
  findById(id: string): Promise<Stream | null>;
  findByUrl(url: string): Promise<Stream | null>;

  list(params: ListStreamsParams): Promise<Stream[]>;

  save(stream: Stream): Promise<Stream>;
  remove(streamId: string): Promise<void>;
}
