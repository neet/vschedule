import { PrismaClient } from '@prisma/client';

import { rehydrateUserFromPrisma } from '../../_shared/adapters/prisma-entity-mapper';
import { IUserRepository, User, UserEmail, UserId } from '../domain';

export class UserRepositoryPrisma implements IUserRepository {
  constructor(private readonly _prisma: PrismaClient) {}

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
