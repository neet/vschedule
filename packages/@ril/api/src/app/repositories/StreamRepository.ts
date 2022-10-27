import { URL } from 'url';

import { Stream, StreamId } from '../../domain/entities';

export interface ListStreamsParams {
  readonly limit?: number;
}

export interface StreamRepository {
  findById(id: StreamId): Promise<Stream | null>;
  findByUrl(url: URL): Promise<Stream | null>;

  list(params: ListStreamsParams): Promise<Stream[]>;

  save(stream: Stream): Promise<Stream>;
  remove(streamId: StreamId): Promise<void>;
}
