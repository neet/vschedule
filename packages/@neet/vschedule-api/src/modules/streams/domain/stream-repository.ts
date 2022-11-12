import { URL } from 'url';

import { Stream } from './stream';
import { StreamId } from './stream-id';

export interface IStreamRepository {
  findById(id: StreamId): Promise<Stream | null>;
  findByUrl(url: URL): Promise<Stream | null>;
  save(stream: Stream): Promise<Stream>;
  update(stream: Stream): Promise<Stream>;
  remove(streamId: StreamId): Promise<void>;
}
