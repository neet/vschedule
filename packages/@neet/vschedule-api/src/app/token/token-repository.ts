import { Token } from '../../domain/entities/token/token';
import { TokenId } from '../../domain/entities/token/token-id';

export interface ITokenRepository {
  create(token: Token): Promise<Token>;
  findById(id: TokenId): Promise<Token | null>;
  drain(id: TokenId): Promise<void>;
}
