import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { ITokenRepository } from '../../app';
import { Token, TokenId } from '../../domain';
import { TYPES } from '../../types';
import { rehydrateTokenFromPrisma } from '../mappers';

@injectable()
export class TokenRepositoryPrisma implements ITokenRepository {
  public constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

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
