import { Token, TokenId } from '../entities/token';

export interface ITokenRepository {
  create(token: Token): Promise<Token>;
  findById(id: TokenId): Promise<Token | null>;
  drain(id: TokenId): Promise<void>;
}
