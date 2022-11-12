import { PrismaClient } from '@prisma/client';

import { rehydrateTokenFromPrisma } from '../../_shared/adapters/prisma-entity-mapper';
import { Token, TokenId } from '../domain';
import { ITokenRepository } from '../domain/token-repository';

export class TokenRepositoryPrisma implements ITokenRepository {
  public constructor(private readonly _prisma: PrismaClient) {}

  async create(token: Token): Promise<Token> {
    const data = await this._prisma.token.create({
      data: {
        id: token.id.value,
        createdAt: token.createdAt.toDate(),
        expiresAt: token.expiresAt.toDate(),
      },
    });

    return rehydrateTokenFromPrisma(data);
  }

  async findById(id: TokenId): Promise<Token | null> {
    const data = await this._prisma.token.findFirst({
      where: {
        id: id.value,
      },
    });

    if (data == null) {
      return null;
    }

    return rehydrateTokenFromPrisma(data);
  }

  async drain(id: TokenId): Promise<void> {
    await this._prisma.token.delete({
      where: {
        id: id.value,
      },
    });
  }
}
