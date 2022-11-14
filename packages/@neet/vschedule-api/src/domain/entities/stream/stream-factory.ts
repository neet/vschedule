import { Stream } from './stream';

export interface IStreamFactory {
  createFromVideoId(videoId: string): Promise<Stream>;
}
