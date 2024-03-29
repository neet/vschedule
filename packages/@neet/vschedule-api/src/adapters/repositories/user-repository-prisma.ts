import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { IUserRepository } from '../../app';
import { User, UserEmail, UserId } from '../../domain';
import { TYPES } from '../../types';
import { rehydrateUserFromPrisma } from '../mappers';

@injectable()
export class UserRepositoryPrisma implements IUserRepository {
  constructor(
    @inject(TYPES.PrismaClient)
    private readonly _prisma: PrismaClient,
  ) {}

  async create(user: User): Promise<User> {
    await this._prisma.user.create({
      data: {
        id: user.id.value,
        passwordHash: user.passwordHash,
        email: user.email.value,
        createdAt: user.createdAt.toDate(),
        updatedAt: user.updatedAt.toDate(),
      },
    });
    return user;
  }

  async findById(id: UserId): Promise<User | null> {
    const user = await this._prisma.user.findFirst({
      where: {
        id: id.value,
      },
    });

    if (user == null) {
      return null;
    }

    return rehydrateUserFromPrisma(user);
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    const user = await this._prisma.user.findFirst({
      where: {
        email: email.value,
      },
    });

    if (user == null) {
      return null;
    }

    return rehydrateUserFromPrisma(user);
  }
}
