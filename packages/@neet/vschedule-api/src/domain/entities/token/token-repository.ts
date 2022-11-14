import { Token } from './token';
import { TokenId } from './token-id';

export interface ITokenRepository {
  create(token: Token): Promise<Token>;
  findById(id: TokenId): Promise<Token | null>;
  drain(id: TokenId): Promise<void>;
}
