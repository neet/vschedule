import { Token } from '../entities/Token/Token';

export interface ITokenRepository {
  findById(id: string): Promise<Token>;
  remove(id: string): Promise<void>;
}
